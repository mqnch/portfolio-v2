'use client';

import PageTabs from '@/components/PageTabs';

export default function Home() {
  return (
    <PageTabs
      about={
        <section className="w-full space-y-5 font-mono text-sm text-gray-400">
          <div className="border-t border-gray-900 pt-1 space-y-1"></div>
          <div className="flex items-baseline justify-between gap-6">
            <div className="flex items-center gap-2">
              <p>math @</p>
              <img
                src="/uwaterloo.svg"
                alt="University of Waterloo logo"
                className="h-4 w-4 rounded-sm"
                style={{ opacity: 0.85 }}
              />
              <p>uwaterloo — applied math & machine learning</p>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-3 space-y-1">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-600">
              projects
            </p>

            <div className="flex items-baseline justify-between gap-6">
              <a
                href="https://www.getajobchud.com"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <span className="text-gray-400">
                  ↳ getajobchud.com
                </span>
                <span className="text-gray-500">
                  {' '}
                  — internship index + application tracker
                </span>
              </a>
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <a
                href="https://github.com/mqnch/hearth."
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <span className="text-gray-400">
                  ↳ hearth.
                </span>
                <span className="text-gray-500">
                  {' '}
                  — house listing analyzer + renovation visualizer
                </span>
              </a>
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <a
                href="https://github.com/mqnch/chess-ai"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <span className="text-gray-400">
                  ↳ self-learning chess ai
                </span>
                <span className="text-gray-500">
                  {' '}
                  — alphazero-like mcts + self-play
                </span>
              </a>
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <a
                href="https://github.com/mqnch/event-date-time-nlp"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <span className="text-gray-400">
                  ↳ event-date-time parser
                </span>
                <span className="text-gray-500">
                  {' '}
                  — converts natural text into json
                </span>
              </a>
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <a
                href="https://github.com/mqnch/numpy-mnist-nn"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <span className="text-gray-400">
                  ↳ mnist neural network
                </span>
                <span className="text-gray-500">
                  {' '}
                  — built from scratch using lin. alg
                </span>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-3 space-y-1">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-600">
              experience
            </p>

            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-center gap-2">
                <p>↳</p>
                <img
                  src="/cumo.svg"
                  alt="Cumo logo"
                  className="h-4 w-4 rounded-sm"
                  style={{ opacity: 0.85 }}
                />
                <p>Cumo — co-founder & lead software developer</p>
              </div>
              <span className="text-xs text-gray-600">2025</span>
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-center gap-2">
                <p>↳</p>
                <img
                  src="/weglobal.png"
                  alt="W.E Global logo"
                  className="h-4 w-4 rounded-sm"
                  style={{ opacity: 0.85 }}
                />
                <p>W.E Global — robotics instructor</p>
              </div>
              <span className="text-xs text-gray-600">2025</span>
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-center gap-2">
                <p>↳</p>
                <img
                  src="/vex.png"
                  alt="VEX Robotics logo"
                  className="h-4 w-4 rounded-sm"
                  style={{ opacity: 0.85 }}
                />
                <p>VEX Robotics — team lead</p>
              </div>
              <span className="text-xs text-gray-600">2021—2025</span>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 text-gray-500">
                <a
                  href="https://github.com/mqnch"
                  target="_blank"
                  rel="noreferrer"
                  className="group transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-colors group-hover:text-gray-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/felixpan1"
                  target="_blank"
                  rel="noreferrer"
                  className="group transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-colors group-hover:text-gray-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M20.447 20.452H16.89V14.88C16.89 13.552 16.865 11.887 15.042 11.887C13.194 11.887 12.905 13.316 12.905 14.784V20.452H9.348V9H12.772V10.561H12.822C13.293 9.709 14.372 8.808 16.003 8.808C19.309 8.808 20.448 10.9 20.448 13.92L20.447 20.452ZM5.337 7.433C4.174 7.433 3.24 6.491 3.24 5.333C3.24 4.175 4.175 3.233 5.337 3.233C6.496 3.233 7.438 4.175 7.438 5.333C7.438 6.491 6.496 7.433 5.337 7.433ZM7.119 20.452H3.554V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.771 0 1.723V22.277C0 23.229 0.792 24 1.771 24H22.222C23.2 24 24 23.229 24 22.277V1.723C24 0.771 23.2 0 22.222 0H22.225Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href="https://github.com/mqnch/portfolio-v2"
                  target="_blank"
                  rel="noreferrer"
                  className="group transition-colors"
                  aria-label="Portfolio source code"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-colors group-hover:text-gray-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <a
                  href="mailto:f3pan@uwaterloo.ca"
                  className="group transition-colors"
                  aria-label="Email"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-colors group-hover:text-gray-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM4 6V6.01L12 11L20 6.01V6H4ZM4 18H20V9L12 14L4 9V18Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>

              <p className="text-xs text-gray-600">2026 © felix pan</p>
            </div>
          </div>
        </section>
      }
      projects={
        <section className="w-full space-y-6 font-mono text-sm text-gray-400 pb-20 md:pb-0">
          <div className="space-y-3">
            <div className="group border-t border-gray-900 pt-5 hover:border-gray-700 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src="/jobmaxxing.png"
                  alt="Screenshot of getajobchud.com internship tracker"
                  className="h-20 w-32 rounded-md border border-gray-800 object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                      getajobchud.com
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      next.js / typescript / tailwind / supabase
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl">
                    aggregates internships from SimplifyJobs and helps you track your applications.
                  </p>
                  <div className="flex gap-4 pt-1 text-xs font-mono">
                    <a
                      href="https://www.getajobchud.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      live site
                    </a>
                    <a
                      href="https://github.com/mqnch/jobmaxxing"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group border-t border-gray-900 pt-5 hover:border-gray-700 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src="/cumo.png"
                  alt="Cumo command bar screenshot"
                  className="h-20 w-32 rounded-md border border-gray-800 object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                      Cumo
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      electron / typescript / tailwind / flask / huey / google oauth
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl">
                    always-on command bar that instantly turns natural language into scheduled events.
                  </p>
                  <div className="flex gap-4 pt-1 text-xs font-mono">
                    <a
                      href="https://github.com/mqnch/Cumo"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group border-t border-gray-900 pt-5 hover:border-gray-700 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src="/chess.png"
                  alt="Self-learning chess AI training visualization"
                  className="h-20 w-32 rounded-md border border-gray-800 object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                      self-learning chess ai
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      pytorch / pandas / cuda
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl">
                    alphazero-style chess engine with monte carlo tree search and
                    self-play reinforcement learning using pytorch and cuda.
                  </p>
                  <div className="flex gap-4 pt-1 text-xs font-mono">
                    <a
                      href="https://github.com/mqnch/chess-ai"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group border-t border-gray-900 pt-5 hover:border-gray-700 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src="/hearth.jpeg"
                  alt="hearth website screenshot"
                  className="h-20 w-32 rounded-md border border-gray-800 object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                      hearth.
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      next.js / typescript / tailwind / fastapi / gemini api
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl">
                    real estate listing analyzer which fixes accessibility issues by generating renovation visualizations & cost estimates.
                  </p>
                  <div className="flex gap-4 pt-1 text-xs font-mono">
                    <a
                      href="https://github.com/mqnch/chess-ai"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group border-t border-gray-900 pt-5 hover:border-gray-700 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src="/datenlp.png"
                  alt="Event-date-time natural language parser interface"
                  className="h-20 w-32 rounded-md border border-gray-800 object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                      event-date-time nlp
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      python / flask / spacy / dateparser
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl">
                    local-first flask api that parses free-form text into structured json for
                    calendar events and reminders.
                  </p>
                  <div className="flex gap-4 pt-1 text-xs font-mono">
                    <a
                      href="https://github.com/mqnch/event-date-time-nlp"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group border-t border-gray-900 pt-5 hover:border-gray-700 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src="/mnist.png"
                  alt="MNIST neural network training metrics"
                  className="h-20 w-32 rounded-md border border-gray-800 object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                      mnist neural network
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      python / numpy
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl">
                    neural network with he initialization, relu activation, 
                    and adam optimization on the mnist. 98% test accuracy.
                  </p>
                  <div className="flex gap-4 pt-1 text-xs font-mono">
                    <a
                      href="https://github.com/mqnch/numpy-mnist-nn"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-200 underline-offset-4 hover:underline"
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      writing={
        <section className="w-full space-y-4">
          <div className="border-t border-gray-900 pt-1 space-y-1"></div>
          <p className="text-sm text-gray-600 font-mono">
            tbd...
          </p>
        </section>
      }
    />
  );
}