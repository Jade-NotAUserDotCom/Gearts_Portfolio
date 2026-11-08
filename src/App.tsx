
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Music2,
  VolumeX,
  BookOpen,
  RotateCcw
} from 'lucide-react'

import { pages } from './data/pages'
import JournalPage from './components/JournalPage'

type TurnDirection = 'next' | 'previous'

type TurningPage = {
  direction: TurnDirection
  fromSpread: number
  toSpread: number
}

const BOOK_ANIMATION_DURATION = 0.85
const BOOK_EASING = [0.645, 0.045, 0.355, 1] as const

export default function App() {
  const [opened, setOpened] = useState(false)
  const [bookAnimating, setBookAnimating] = useState(false)
  const [closingBook, setClosingBook] = useState(false)
  const [coverHidden, setCoverHidden] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const [music, setMusic] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [turning, setTurning] = useState<TurningPage | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const totalPages = pages.length
  const currentSpread = Math.floor(currentPage / 2)
  const totalSpreads = Math.ceil((totalPages + 1) / 2)

  // The cover occupies the first spread's left side.
  // The first content page is on the right.
  const leftPage =
    currentSpread === 0
      ? undefined
      : pages[currentSpread * 2 - 1]

  const rightPage = pages[currentSpread * 2]
  const mobilePage = pages[currentPage]

  const staticLeftPage = turning
    ? turning.direction === 'next'
      ? leftPage
      : turning.toSpread === 0
        ? undefined
        : pages[turning.toSpread * 2 - 1]
    : leftPage

  const staticRightPage = turning
    ? turning.direction === 'next'
      ? pages[turning.toSpread * 2]
      : pages[turning.fromSpread * 2]
    : rightPage

  const turningFrontPage = turning
    ? turning.direction === 'next'
      ? pages[turning.fromSpread * 2]
      : pages[turning.fromSpread * 2 - 1]
    : undefined

  const turningBackPage = turning
    ? turning.direction === 'next'
      ? pages[turning.toSpread * 2 - 1]
      : pages[turning.toSpread * 2]
    : undefined

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)')

    const updateLayout = () => {
      setIsMobile(mediaQuery.matches)
      setTurning(null)
    }

    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)

    return () => {
      mediaQuery.removeEventListener('change', updateLayout)
    }
  }, [])

  const startMusic = async () => {
    if (!audioRef.current) return

    try {
      await audioRef.current.play()
      setMusic(true)
    } catch (error) {
      console.error('Unable to play music:', error)
      setMusic(false)
    }
  }

  const toggleMusic = async () => {
    if (!audioRef.current) return

    if (music) {
      audioRef.current.pause()
      setMusic(false)
    } else {
      await startMusic()
    }
  }

  // Open the journal and show the cover during its opening animation.
  const openJournal = () => {
    if (opened || bookAnimating) return

    setClosingBook(false)
    setCoverHidden(false)
    setBookAnimating(true)
    setOpened(true)

    void startMusic()
  }

  // Restore the cover before playing the closing animation.
  const returnToCover = () => {
    if (!opened || bookAnimating || turning) return

    setCoverHidden(false)
    setClosingBook(true)
    setBookAnimating(true)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setMusic(false)
  }

  const finishBookAnimation = () => {
    if (!bookAnimating) return

    if (closingBook) {
      setOpened(false)
      setCurrentPage(0)
      setTurning(null)
      setClosingBook(false)
      setCoverHidden(false)
    }

    setBookAnimating(false)
  }

  const next = () => {
    if (turning || bookAnimating || !opened) return

    if (isMobile) {
      setCurrentPage(current =>
        Math.min(totalPages - 1, current + 1)
      )
      return
    }

    if (currentSpread >= totalSpreads - 1) return

    setTurning({
      direction: 'next',
      fromSpread: currentSpread,
      toSpread: currentSpread + 1
    })
  }

  const previous = () => {
    if (turning || bookAnimating || !opened) return

    if (isMobile) {
      setCurrentPage(current =>
        Math.max(0, current - 1)
      )
      return
    }

    if (currentSpread <= 0) return

    setTurning({
      direction: 'previous',
      fromSpread: currentSpread,
      toSpread: currentSpread - 1
    })
  }

  // Hide the cover only after the first forward page turn completes.
  const finishTurn = () => {
    if (!turning) return

    setCurrentPage(turning.toSpread * 2)

    if (
      turning.direction === 'next' &&
      turning.fromSpread === 0
    ) {
      setCoverHidden(true)
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTurning(null)
      })
    })
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!opened || bookAnimating) return

      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'Escape') returnToCover()
    }

    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [opened, isMobile, currentPage, turning, bookAnimating])

  const handleTouchEnd = (endX: number) => {
    if (touchStart === null || bookAnimating) return

    const delta = endX - touchStart

    if (Math.abs(delta) > 45) {
      if (delta < 0) next()
      else previous()
    }

    setTouchStart(null)
  }

  const progress = isMobile
    ? ((currentPage + 1) / totalPages) * 100
    : ((currentSpread + 1) / totalSpreads) * 100

  const bookClass = [
    'book-assembly',
    closingBook ? 'is-closing' : opened ? 'is-open' : 'is-closed',
    bookAnimating ? 'is-animating' : '',
    turning?.direction === 'next' && turning.fromSpread === 0
      ? 'is-first-turn'
      : ''
  ].filter(Boolean).join(' ')

  return (
    <main className="scene">
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="stars" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
              animationDelay: `${(i % 7) * -0.8}s`
            }}
          />
        ))}
      </div>

      <section
        className={`journal-scene ${
          opened ? 'journal-reading' : 'journal-cover'
        }`}
      >
        {opened && (
          <header className="reader-header">
            <div className="reader-brand">
              <BookOpen size={17} />
              <span>The Dreamer's Journal</span>
            </div>

            <div className="reader-actions">
              <button
                className="icon-button"
                onClick={toggleMusic}
                title={music ? 'Turn music off' : 'Turn music on'}
                aria-label={music ? 'Turn music off' : 'Turn music on'}
                disabled={bookAnimating}
              >
                {music ? <Music2 size={18} /> : <VolumeX size={18} />}
              </button>

              <button
                className="icon-button"
                onClick={returnToCover}
                title="Return to cover"
                aria-label="Return to cover"
                disabled={bookAnimating}
              >
                <RotateCcw size={17} />
              </button>
            </div>
          </header>
        )}

        <div
          className={`book-stage integrated-stage ${
            isMobile ? 'mobile-stage' : 'desktop-stage'
          }`}
          onTouchStart={event => {
            if (opened && !bookAnimating) {
              setTouchStart(event.touches[0].clientX)
            }
          }}
          onTouchEnd={event =>
            handleTouchEnd(event.changedTouches[0].clientX)
          }
        >
          {opened && (
            <button
              className="nav-button prev"
              onClick={previous}
              disabled={
                bookAnimating ||
                turning !== null ||
                (isMobile ? currentPage === 0 : currentSpread === 0)
              }
              aria-label="Previous page"
            >
              <ArrowLeft />
            </button>
          )}

          <div className={bookClass}>
            <div className="book-base">
              <span className="back-cover-decoration">✦</span>
            </div>

            <div className={`open-book ${opened ? 'pages-visible' : ''}`}>
              <div
                className={`book-pages ${
                  isMobile ? 'single-page' : 'double-page'
                }`}
              >
                {opened && (
                  <>
                    {isMobile ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`mobile-${currentPage}`}
                          className="page-slot mobile-slot"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{
                            duration: 0.35,
                            ease: 'easeInOut'
                          }}
                        >
                          {mobilePage && (
                            <JournalPage page={mobilePage} side="right" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <>
                        {staticLeftPage && !bookAnimating && (
                          <div className="page-slot left-slot">
                            <JournalPage page={staticLeftPage} side="left" />
                          </div>
                        )}

                        {staticRightPage && (
                          <div className="page-slot right-slot">
                            <JournalPage page={staticRightPage} side="right" />
                          </div>
                        )}

                        <div className="spine-shadow" />

                        {turning && turningFrontPage && turningBackPage && (
                          <motion.div
                            key={`${turning.direction}-${turning.fromSpread}`}
                            className={`turning-leaf ${
                              turning.direction === 'next'
                                ? 'turning-next'
                                : 'turning-previous'
                            }`}
                            initial={{ rotateY: 0 }}
                            animate={{
                              rotateY: turning.direction === 'next' ? -180 : 180
                            }}
                            transition={{
                              duration: BOOK_ANIMATION_DURATION,
                              ease: BOOK_EASING
                            }}
                            onAnimationComplete={finishTurn}
                          >
                            <div className="turning-leaf-front">
                              <JournalPage
                                page={turningFrontPage}
                                side={
                                  turning.direction === 'next' ? 'right' : 'left'
                                }
                              />
                            </div>

                            <div className="turning-leaf-back">
                              <JournalPage
                                page={turningBackPage}
                                side={
                                  turning.direction === 'next' ? 'left' : 'right'
                                }
                              />
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <motion.button
              className="book-cover"
              onClick={openJournal}
              initial={false}
              animate={{
                rotateY: opened && !closingBook ? -180 : 0
              }}
              transition={{
                duration: bookAnimating ? BOOK_ANIMATION_DURATION : 0,
                ease: BOOK_EASING
              }}
              onAnimationComplete={finishBookAnimation}
              style={{
                visibility: coverHidden ? 'hidden' : 'visible',
                pointerEvents: opened || bookAnimating ? 'none' : 'auto'
              }}
              aria-label="Open The Dreamer's Journal"
            >
              <span className="cover-face cover-front">
                <span className="cover-spine" />

                <span className="cover-border">
                  <span className="cover-corner top-left">❧</span>
                  <span className="cover-corner top-right">❧</span>
                  <span className="cover-corner bottom-left">❧</span>
                  <span className="cover-corner bottom-right">❧</span>
                </span>

                <span className="cover-content">
                  <span className="cover-kicker">
                    A COLLECTION OF CREATIONS
                  </span>

                  <span className="moon-emblem">
                    ☾
                    <small>✦</small>
                  </span>

                  <span className="cover-title">
                    A Dreamer's
                    <br />
                    Journal
                  </span>

                  <span className="cover-rule" />

                  <span className="cover-subtitle">
                    ART · MEMORY · IMAGINATION
                  </span>
                </span>
              </span>

              <span className="cover-face cover-back">
                <span className="inside-cover-decoration">✦</span>
              </span>
            </motion.button>
          </div>

          {opened && (
            <button
              className="nav-button next"
              onClick={next}
              disabled={
                bookAnimating ||
                turning !== null ||
                (isMobile
                  ? currentPage >= totalPages - 1
                  : currentSpread >= totalSpreads - 1)
              }
              aria-label="Next page"
            >
              <ArrowRight />
            </button>
          )}
        </div>

        {!opened && !bookAnimating && (
          <motion.p
            className="open-hint"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Tap the journal to open
          </motion.p>
        )}

        {opened && (
          <footer className="reader-footer">
            <span>
              {isMobile
                ? `PAGE ${currentPage + 1} / ${totalPages}`
                : `SPREAD ${currentSpread + 1} / ${totalSpreads}`}
            </span>

            <div className="progress-track">
              <span style={{ width: `${progress}%` }} />
            </div>

            <span className="keyboard-hint">
              {isMobile ? 'Swipe to turn pages' : '← → to turn pages'}
            </span>
          </footer>
        )}
      </section>

      <div className="ambient-footer">
        MADE WITH CURIOSITY & IMAGINATION
      </div>
    </main>
  )
}
