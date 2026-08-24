// Hardcoded testimonial content, loaded as a plain script (not fetched)
// so it works even when index.html is opened directly as a local file —
// fetch() of testimonials.json fails under file:// with a CORS error,
// since browsers only allow fetch() over http(s) origins.
//
// This is the "for now" fix. Once the site is actually deployed/served,
// testimonials.js can go back to fetching assets/data/testimonials.json
// (kept in place for exactly that, and as the format the vfsoffice
// approval workflow is expected to write into) — swap TESTIMONIALS_DATA
// for a fetch() call at that point.
//
// Names are left as placeholders, not invented — these are illustrative
// example reviews pending real client-supplied ones, not attributed to
// fabricated people.
'use strict';

const TESTIMONIALS_DATA = [
  { name: 'Client testimonial — to be supplied', rating: 5, comment: 'I came in wanting to buy one thing. They made me fix my emergency fund and health cover first. Annoying then, obviously right now.' },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: "Started at ₹2,000 a month in my first job. Six years later it's my house down payment. Nobody ever pushed me to buy more than I could." },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: "They answer the phone. That sounds like a low bar until you've dealt with an app-only platform during a claim." },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: "Didn't know NPS gave an extra deduction until they walked me through it. Small change, real difference every March." },
  { name: 'Client testimonial — to be supplied', rating: 4, comment: 'Needed cash for a down payment and almost sold my funds. They pointed me to a loan against the portfolio instead — kept the SIPs running.' },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: 'Retirement felt far away until they put a number on it. Now there’s an actual plan instead of a vague hope.' },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: "We started a separate SIP the week our daughter was born. Ten years in, it's already more than half the target." },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: 'They wouldn’t let me start equity SIPs until the emergency fund was done. Turned out to be the right call within the year.' },
  { name: 'Client testimonial — to be supplied', rating: 4, comment: 'Used to scramble every February for tax proofs. Now it’s automated and I actually understand what I’m claiming.' },
  { name: 'Client testimonial — to be supplied', rating: 5, comment: "When my father's claim needed paperwork, they handled the back-and-forth with the insurer directly. That's worth more than a lower premium." }
];
