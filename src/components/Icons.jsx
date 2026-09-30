export function Icon({ name = 'arrow', size = 20, ...props }) {
    const paths = {
        arrow: <path d="M5 19 19 5M5 5h14v14" />,
        down: <path d="M12 4v16m-6-6 6 6 6-6" />,
        code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20" />,
        mail: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m2 6 10 7L22 6" /></>,
        sound: <path d="m3 9 4 0 5-4v14l-5-4H3zM16 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14" />,
        mute: <path d="m3 9 4 0 5-4v14l-5-4H3zM17 9l5 6m0-6-5 6" />,
        pause: <path d="M8 5v14M16 5v14" />,
        play: <path d="m7 4 14 8-14 8z" />,
        check: <path d="m5 12 4 4L20 5" />,
        menu: <path d="M4 7h16M4 12h16M4 17h16" />,
        close: <path d="m6 6 12 12M18 6 6 18" />,
        pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
        copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
export function SpiderMark({ className = '', ...props }) {
    return <svg className={className} viewBox="0 0 60 70" fill="none" aria-hidden="true" {...props}><g stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="30" cy="39" rx="6" ry="12" fill="currentColor"/><circle cx="30" cy="23" r="4" fill="currentColor"/><path d="m25 27-9-11-1-11m20 22 9-11 1-11M24 34 9 24 3 10m33 24 15-10 6-14M24 40 10 43 4 60m32-20 14 3 6 17M26 47 17 58 16 68m18-21 9 11 1 10" /></g></svg>;
}
export function BatMark({ className = '', ...props }) {
    return <svg className={className} viewBox="0 0 100 55" fill="currentColor" aria-hidden="true" {...props}><path d="M2 3c14 7 24 7 33 10L43 4l3 13h8l3-13 8 9C76 10 86 10 98 3c-5 9-5 17 0 27-15-8-24-5-25 7-12-6-20 1-23 15-4-14-12-21-23-15-2-12-11-15-25-7C7 19 7 11 2 3Z" /></svg>;
}
export function SplitMask({ className = '' }) {
    return <svg className={className} viewBox="0 0 240 300" fill="none" aria-hidden="true"><path d="M120 43C40 43 26 102 43 192c9 55 50 80 77 88V43Z" fill="#e63732" stroke="#151515" strokeWidth="5"/><path d="m120 43 54-23 22-17-2 60c37 38 21 143-21 193l-53 24V43Z" fill="#1c202b" stroke="#151515" strokeWidth="5"/><g stroke="#171717" strokeWidth="2.5" opacity=".8"><path d="M120 128 43 86m77 42-84 17m84-17-69 62m69-62-44 102m44-102v133M54 62c0 75 18 133 42 166M37 102c18 12 44 28 83 27M37 143c25 13 53 17 83 13M47 189c22 6 47 5 73-1M72 235c16 0 32-3 48-7"/></g><path d="m49 116 62 23c-2 29-20 42-43 21z" fill="#f8f3e9" stroke="#111" strokeWidth="7"/><path d="m190 116-61 23c2 29 20 42 43 21z" fill="#f8f3e9" stroke="#111" strokeWidth="7"/><path d="m122 224 36-11-38 40" stroke="#737580" strokeWidth="3"/><path d="m192 65-35 23 10-57" stroke="#737580" strokeWidth="2"/></svg>;
}
