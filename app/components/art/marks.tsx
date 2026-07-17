/**
 * Original Word of Mouth brand artwork, drawn for this build.
 *
 * The parrot lives here as symbolic language — the official vector mark,
 * feathers, wing arcs, speech rings, and signal waves — instead of literal
 * renders. Every component is a pure SVG function usable from server or
 * client components. Decorative usages must pass aria-hidden via props.
 */

type ArtProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

const MARK_COLORS = {
  full: { body: "#101010", crest: "#d9363e", tail: "#3DBC55", wing: "#4B86EC" },
  ink: { body: "#101010", crest: "#101010", tail: "#101010", wing: "#101010" },
  signal: { body: "#d9363e", crest: "#d9363e", tail: "#d9363e", wing: "#d9363e" },
  paper: { body: "#fbf7f1", crest: "#fbf7f1", tail: "#fbf7f1", wing: "#fbf7f1" },
} as const;

/** The faithful official parrot paths, one entry per ink pass. */
const MARK_PATHS = {
  body: "M 521 653 L 521 655 L 535 651 L 556 652 L 585 662 L 585 660 L 580 657 L 579 654 L 574 654 L 567 650 L 552 646 L 537 646 L 527 649 Z M 574 580 L 578 650 L 580 650 L 582 633 L 581 607 L 576 580 Z M 353 281 L 349 286 L 340 307 L 339 327 L 344 339 L 353 348 L 361 353 L 374 357 L 366 342 L 364 334 L 395 333 L 402 320 L 402 309 L 396 299 L 383 290 L 361 282 Z M 393 262 L 393 265 L 391 267 L 388 267 L 387 272 L 391 278 L 399 279 L 405 274 L 405 267 L 400 262 Z M 515 122 L 484 124 L 439 132 L 405 142 L 366 158 L 336 174 L 306 194 L 280 215 L 251 244 L 234 264 L 213 294 L 200 316 L 181 357 L 168 397 L 161 430 L 157 464 L 156 497 L 158 531 L 165 573 L 177 615 L 191 649 L 204 674 L 228 711 L 251 739 L 278 766 L 301 785 L 328 804 L 356 820 L 394 837 L 424 847 L 458 855 L 496 860 L 532 861 L 555 860 L 562 858 L 562 692 L 564 690 L 578 690 L 578 665 L 513 665 L 513 690 L 535 690 L 537 693 L 537 831 L 535 833 L 498 833 L 447 825 L 405 812 L 360 791 L 324 768 L 297 746 L 263 711 L 234 671 L 211 627 L 195 581 L 190 561 L 185 529 L 183 488 L 187 439 L 198 391 L 216 345 L 234 312 L 249 290 L 269 265 L 298 236 L 316 221 L 343 202 L 377 183 L 402 172 L 443 159 L 487 151 L 515 149 L 564 151 L 595 156 L 626 164 L 661 177 L 693 193 L 727 215 L 753 236 L 779 262 L 799 286 L 815 309 L 832 339 L 848 376 L 856 402 L 864 439 L 867 465 L 867 517 L 864 544 L 856 581 L 838 631 L 820 666 L 797 700 L 781 719 L 743 755 L 743 788 L 746 788 L 775 764 L 807 731 L 832 698 L 854 661 L 875 612 L 886 573 L 893 530 L 895 488 L 892 444 L 886 410 L 875 371 L 860 334 L 847 309 L 825 275 L 800 244 L 772 216 L 745 194 L 708 170 L 674 153 L 646 142 L 620 134 L 587 127 L 553 123 Z",
  crest:
    "M 614 623 L 625 735 L 641 748 L 662 769 L 684 798 L 700 830 L 705 850 L 706 862 L 708 862 L 712 839 L 713 804 L 709 771 L 697 730 L 682 699 L 663 670 L 649 653 L 619 624 Z M 522 331 L 513 341 L 508 354 L 508 363 L 511 374 L 521 391 L 573 443 L 613 479 L 661 518 L 679 531 L 685 533 L 685 530 L 646 451 L 649 450 L 669 466 L 674 467 L 674 465 L 649 420 L 623 384 L 599 358 L 566 333 L 540 322 L 535 323 Z M 373 244 L 363 253 L 357 263 L 369 257 L 380 254 L 403 253 L 412 255 L 421 260 L 427 267 L 432 279 L 433 289 L 427 318 L 419 336 L 412 345 L 410 351 L 423 366 L 428 377 L 432 400 L 432 419 L 436 446 L 444 468 L 456 491 L 472 513 L 494 535 L 510 547 L 532 561 L 550 570 L 562 574 L 575 574 L 580 570 L 580 568 L 564 554 L 539 526 L 515 491 L 494 446 L 486 416 L 486 382 L 488 368 L 493 352 L 499 341 L 511 328 L 518 323 L 531 318 L 542 317 L 542 315 L 536 309 L 537 305 L 550 309 L 550 306 L 528 278 L 514 265 L 490 249 L 470 240 L 454 235 L 436 232 L 408 232 L 386 237 Z",
  tail: "M 626 768 L 624 768 L 623 809 L 619 865 L 617 870 L 616 888 L 607 943 L 591 1007 L 589 1008 L 583 1029 L 565 1071 L 569 1071 L 581 1058 L 600 1034 L 613 1014 L 631 979 L 636 963 L 639 959 L 640 950 L 642 948 L 646 933 L 651 901 L 650 845 L 643 810 L 641 808 L 638 795 L 633 785 L 633 781 Z M 499 380 L 496 387 L 496 412 L 500 427 L 511 452 L 530 479 L 550 499 L 582 527 L 635 569 L 689 603 L 698 604 L 699 599 L 678 540 L 670 533 L 640 515 L 597 481 L 547 432 L 502 380 Z",
  wing: "M 625 743 L 625 758 L 643 775 L 649 783 L 660 808 L 664 829 L 664 877 L 658 918 L 650 953 L 653 953 L 671 923 L 682 896 L 689 864 L 689 835 L 685 815 L 680 802 L 670 784 L 660 771 L 643 754 L 629 743 Z M 563 525 L 566 531 L 632 608 L 673 668 L 688 692 L 699 715 L 701 715 L 695 655 L 698 654 L 707 666 L 709 666 L 709 662 L 703 636 L 698 623 L 692 617 L 671 604 L 665 598 L 569 527 Z",
} as const;

const MURAL_INKS = {
  body: "#101010",
  crest: "#db3235",
  tail: "#3dbc55",
  wing: "#4b86ec",
} as const;

/**
 * The official mark blown up to wall scale — a four-color screen print.
 * Every ink pass lives in its own group (`.mural-body`, `.mural-crest`,
 * `.mural-tail`, `.mural-wing`) so GSAP can land, drift, and parallax the
 * passes independently; the inner `.mural-drift` group carries the idle
 * breathing so it never fights the pointer parallax.
 */
export function ParrotMural({ className, ...rest }: ArtProps) {
  return (
    <svg
      viewBox="150 115 750 960"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      {(Object.keys(MARK_PATHS) as Array<keyof typeof MARK_PATHS>).map((pass) => (
        <g className={`mural-layer mural-${pass}`} key={pass}>
          <g className="mural-drift">
            <path d={MARK_PATHS[pass]} fill={MURAL_INKS[pass]} fillRule="evenodd" clipRule="evenodd" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/**
 * The official Word of Mouth parrot symbol (faithful vector paths from the
 * brand package), without the white plate so it can sit on any surface.
 */
export function ParrotMark({
  tone = "full",
  title,
  className,
  ...rest
}: ArtProps & { tone?: keyof typeof MARK_COLORS; title?: string }) {
  const c = MARK_COLORS[tone];
  return (
    <svg
      viewBox="150 115 750 960"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {(Object.keys(MARK_PATHS) as Array<keyof typeof MARK_PATHS>).map((pass) => (
        <path key={pass} d={MARK_PATHS[pass]} fill={c[pass]} fillRule="evenodd" clipRule="evenodd" />
      ))}
    </svg>
  );
}

/** A single stylized feather — slender quill with a central rachis. */
export function Feather({
  color = "var(--signal)",
  className,
  ...rest
}: ArtProps & { color?: string }) {
  return (
    <svg viewBox="0 0 60 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...rest}>
      <path
        d="M30 2 C46 30 54 78 46 128 C42 152 34 166 30 172 C26 166 18 152 14 128 C6 78 14 30 30 2 Z"
        fill={color}
        opacity="0.92"
      />
      <path d="M30 8 L30 172" stroke="var(--paper-light)" strokeWidth="2" opacity="0.55" />
      <path
        d="M30 40 C36 44 42 50 45 58 M30 64 C37 68 43 75 46 84 M30 88 C36 92 41 99 44 108 M30 40 C24 44 18 50 15 58 M30 64 C23 68 17 75 14 84 M30 88 C24 92 19 99 16 108"
        stroke="var(--paper-light)"
        strokeWidth="1.1"
        opacity="0.35"
      />
    </svg>
  );
}

/** Concentric wing arcs — the brand's flight gesture in line form. */
export function WingArc({
  color = "var(--signal)",
  className,
  ...rest
}: ArtProps & { color?: string }) {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...rest}>
      <path d="M16 196 A 180 180 0 0 1 196 16" stroke={color} strokeWidth="2.5" className="wing-arc-path" />
      <path d="M56 196 A 140 140 0 0 1 196 56" stroke={color} strokeWidth="2" opacity="0.65" className="wing-arc-path" />
      <path d="M96 196 A 100 100 0 0 1 196 96" stroke={color} strokeWidth="1.5" opacity="0.4" className="wing-arc-path" />
      <circle cx="196" cy="16" r="5" fill={color} className="wing-arc-dot" />
    </svg>
  );
}

/** A signal pulse — flat line, one clear spike, flat line. */
export function SignalWave({
  color = "var(--signal)",
  className,
  ...rest
}: ArtProps & { color?: string }) {
  return (
    <svg
      viewBox="0 0 240 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      {...rest}
    >
      <path
        d="M0 24 H72 L84 24 L94 6 L106 42 L116 12 L126 32 L134 24 H240"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="signal-wave-path"
      />
    </svg>
  );
}

/** Open conversation ring with a signal dot — echo of the ring in the mark. */
export function SpeechRing({
  color = "var(--ink)",
  className,
  ...rest
}: ArtProps & { color?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...rest}>
      <path
        d="M 96 88 A 46 46 0 1 1 104 60"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        className="speech-ring-path"
      />
      <circle cx="104" cy="60" r="7" fill="var(--signal)" className="speech-ring-dot" />
    </svg>
  );
}
