// This code was mostly taken from gh-badges:
// https://github.com/badges/shields/tree/master/gh-badges
// gh-badges is a command line tool/library that generates badges as an svg string
// it uses the nodejs filesystem to read an svg template into memory and perform
// transformations and replacements to modify the svg template
// to fit the badge parameters such as the text, and color.
// it then created an anonymous function with the modified svg template
// with a single parameter to be used to create the final svg string.
// these anonymous functions are created via an external dependency named dot:
// https://www.npmjs.com/package/dot
// since it used the filesystem to read template files, this cannot be used in a browser
// I simply generated the anonymous functions for the various templates and
// included them in this file.
// the remaining code is taken from the gh-badges library file: lib/make-badge.js
// another modification was that gh-badges depends on anafanafo
// a library that outputs text width. this library also depends on the file system
// in order to replace anafanafo, I simply made a widthTable which is composed of
// outputs from anafanafo that I modified slightly to produce reliable results.
// If the output svg from makeBadge doesnt seem like the text fits, I also
// provided an lwOverride and rwOverride option to override the widths of the
// left and right texts respectively.

const widthTable = {
  ' ': 4,
  '!': 4,
  '"': 5,
  '#': 9,
  '$': 6,
  '%': 11,
  '&': 7,
  '\'' : 2,
  '(': 4,
  ')': 4,
  '*': 6,
  '+': 9,
  ',': 4,
  '-': 4,
  '.': 4,
  '/': 4,
  '0': 7,
  '1': 7,
  '2': 7,
  '3': 7,
  '4': 7,
  '5': 7,
  '6': 7,
  '7': 7,
  '8': 7,
  '9': 7,
  ':': 4,
  ';': 4,
  '<': 9,
  '=': 9,
  '>': 9,
  '?': 6,
  '@': 11,
  'A': 7,
  'B': 7,
  'C': 7,
  'D': 8,
  'E': 6,
  'F': 6,
  'G': 8,
  'H': 8,
  'I': 4,
  'J': 5,
  'K': 7,
  'L': 6,
  'M': 9,
  'N': 8,
  'O': 8,
  'P': 6,
  'Q': 8,
  'R': 7,
  'S': 7,
  'T': 6,
  'U': 8,
  'V': 7,
  'W': 10,
  'X': 7,
  'Y': 6,
  'Z': 7,
  '[': 4,
  '\\': 4,
  ']': 4,
  '^': 9,
  '_': 6,
  '`': 6,
  'a': 6,
  'b': 7,
  'c': 6,
  'd': 7,
  'e': 7,
  'f': 4,
  'g': 6,
  'h': 7,
  'i': 4,
  'j': 4,
  'k': 6,
  'l': 4,
  'm': 10,
  'n': 7,
  'o': 7,
  'p': 7,
  'q': 7,
  'r': 4,
  's': 6,
  't': 5,
  'u': 7,
  'v': 7,
  'w': 10,
  'x': 7,
  'y': 7,
  'z': 6,
  '{': 6,
  '|': 4,
  '}': 6,
  '~': 9,
}

function flatSquare(it) {
  var out='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+((it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 7) : 11))+it.widths[1])+'" height="20"><g shape-rendering="crispEdges"><path fill="'+(it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1")))+'" d="M0 0h'+(it.widths[0])+'v20H0z"/><path fill="'+(it.escapeXml(it.colorB||"#4c1"))+'" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v20H'+(it.widths[0])+'z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">';if(it.logo){out+='<image x="5" y="3" width="'+(it.logoWidth)+'" height="14" xlink:href="'+(it.logo)+'"/>';}out+=' ';if(it.text[0].length){out+='<text x="'+((((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10)+'" y="140" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text>';}out+='<text x="'+((it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0 ))*10)+'" y="140" transform="scale(.1)" textLength="'+((it.widths[1]-10)*10)+'">'+(it.escapedText[1])+'</text></g>';if((it.links[0] && it.links[0].length)){out+='<a target="_blank" xlink:href="'+(it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M0 0h'+(it.widths[0])+'v20H0z"/></a>';}out+=' ';if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='<a target="_blank" xlink:href="'+(it.links[1] || it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v20H'+(it.widths[0])+'z"/></a>';}out+='</svg>';return out;
}

function flat(it) {
  var out='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+((it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 7) : 11))+it.widths[1])+'" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="'+(it.widths[0]+it.widths[1])+'" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="'+(it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1")))+'" d="M0 0h'+(it.widths[0])+'v20H0z"/><path fill="'+(it.escapeXml(it.colorB||"#4c1"))+'" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v20H'+(it.widths[0])+'z"/><path fill="url(#b)" d="M0 0h'+(it.widths[0]+it.widths[1])+'v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">';if(it.logo){out+='<image x="5" y="3" width="'+(it.logoWidth)+'" height="14" xlink:href="'+(it.logo)+'"/>';}if(it.text[0].length){out+='<text x="'+((((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10)+'" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text><text x="'+((((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10)+'" y="140" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text>';}out+='<text x="'+((it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0 ))*10)+'" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="'+((it.widths[1]-10)*10)+'">'+(it.escapedText[1])+'</text><text x="'+((it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0 ))*10)+'" y="140" transform="scale(.1)" textLength="'+((it.widths[1]-10)*10)+'">'+(it.escapedText[1])+'</text></g>';if((it.links[0] && it.links[0].length)){out+='<a target="_blank" xlink:href="'+(it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M0 0h'+(it.widths[0])+'v20H0z"/></a>';}if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='<a target="_blank" xlink:href="'+(it.links[1] || it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v20H'+(it.widths[0])+'z"/></a>';}out+='</svg>';return out;
}

function forTheBadge(it) {
  var out='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+((it.widths[0] -= it.text[0].length ? -(10+(it.text[0].length*1.5)) : (it.logo ? (it.colorA ? -7 : 7) : 11))+(it.widths[1]+=(10+(it.text[1].length*2))))+'" height="28"><g shape-rendering="crispEdges"><path fill="'+(it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1")))+'" d="M0 0h'+(it.widths[0])+'v28H0z"/><path fill="'+(it.escapeXml(it.colorB||"#4c1"))+'" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v28H'+(it.widths[0])+'z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="100">';if(it.logo){out+='<image x="9" y="7" width="'+(it.logoWidth)+'" height="14" xlink:href="'+(it.logo)+'"/>';}out+=' ';if(it.text[0].length){out+='<text x="'+(((it.widths[0]+it.logoWidth+it.logoPadding)/2)*10)+'" y="175" transform="scale(.1)" textLength="'+((it.widths[0]-(24+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text>';}out+='<text x="'+((it.widths[0]+it.widths[1]/2)*10)+'" y="175" font-weight="bold" transform="scale(.1)" textLength="'+((it.widths[1]-24)*10)+'">'+(it.escapedText[1])+'</text></g>';if((it.text[0].length && it.links[0] && it.links[0].length)){out+='<a target="_blank" xlink:href="'+(it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M0 0h'+(it.widths[0])+'v28H0z"/></a>';}out+=' ';if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='<a target="_blank" xlink:href="'+(it.links[1] || it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v28H'+(it.widths[0])+'z"/></a>';}out+='</svg>';return out;
}

// there is a bug with the colors not being right on the plastic template
// function plastic(it) {
//   var out='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+((it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 7) : 11))+it.widths[1])+'" height="18"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><clipPath id="a"><rect width="'+(it.widths[0]+it.widths[1])+'" height="18" rx="4" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="'+(it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1")))+'" d="M0 0h'+(it.widths[0])+'v18H0z"/><path fill="'+(it.escapeXml(it.colorB||"#4c1"))+'" d="M'+(it.widths[0])+'0h'+(it.widths[1])+'v18H'+(it.widths[0])+'z"/><path fill="url(#b)" d="M0 0h'+(it.widths[0]+it.widths[1])+'v18H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">';if(it.logo){out+='<image x="5" y="3" width="'+(it.logoWidth)+'" height="14" xlink:href="'+(it.logo)+'"/>';}out+=' ';if(it.text[0].length){out+='<text x="'+((((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10)+'" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text><text x="'+((((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10)+'" y="130" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text>';}out+='<text x="'+((it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0))*10)+'" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="'+((it.widths[1]-10)*10)+'">'+(it.escapedText[1])+'</text><text x="'+((it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0))*10)+'" y="130" transform="scale(.1)" textLength="'+((it.widths[1]-10)*10)+'">'+(it.escapedText[1])+'</text></g>';if((it.links[0] && it.links[0].length)){out+='<a target="_blank" xlink:href="'+(it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M0 0h'+(it.widths[0])+'v18H0z"/></a>';}out+=' ';if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='<a target="_blank" xlink:href="'+(it.links[1] || it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v18H'+(it.widths[0])+'z"/></a>';}out+='</svg>';return out;
// }

function popoutSquare(it) {
  var out='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+((it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 6) : 11))+it.widths[1])+'" height="40"><g shape-rendering="crispEdges"><path fill="'+(it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1")))+'" d="M0 '+(10-it.logoPosition)+'h'+(it.widths[0])+'v20H0z"/><path fill="'+(it.escapeXml(it.colorB||"#4c1"))+'" d="M'+(it.widths[0])+' '+(10-it.logoPosition)+'h'+(it.widths[1])+'v20H'+(it.widths[0])+'z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">';if(it.logo){out+='<image x="5" y="3" width="'+(it.logoWidth)+'" height="32" xlink:href="'+(it.logo)+'"/>';}out+='<text x="'+((((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10)+'" y="'+((24-it.logoPosition)*10)+'" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text><text x="'+((it.widths[0]+it.widths[1]/2-1)*10)+'" y="'+((24-it.logoPosition)*10)+'" transform="scale(.1)" textLength="'+((it.widths[1]-10)*10)+'">'+(it.escapedText[1])+'</text></g>';if((it.links[0] && it.links[0].length)){out+='<a xlink:href="'+(it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M0 0h'+(it.widths[0])+'v40H0z"/></a>';}out+=' ';if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='<a xlink:href="'+(it.links[1] || it.links[0])+'"><path fill="rgba(0,0,0,0)" d="M'+(it.widths[0])+' 0h'+(it.widths[1])+'v40H'+(it.widths[0])+'z"/></a>';}out+='</svg>';return out;
}

function social(it) {
  var out='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+(it.widths[0]+1 + (it.text[1] && it.text[1].length > 0 ? it.widths[1]+2 : 0))+'" height="20">';it.widths[1]-=4;out+='<style>a #llink:hover{fill:url(#b);stroke:#ccc}a #rlink:hover{fill:#4183c4}</style><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fcfcfc" stop-opacity="0"/><stop offset="1" stop-opacity=".1"/></linearGradient><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#ccc" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><g stroke="#d5d5d5"><rect stroke="none" fill="#fcfcfc" x=".5" y=".5" width="'+(it.widths[0])+'" height="19" rx="2"/>';if((it.text[1] && it.text[1].length)){out+='<rect y=".5" x="'+(it.widths[0]+6.5)+'" width="'+(it.widths[1])+'" height="19" rx="2" fill="#fafafa"/><path stroke="#fafafa" d="M'+(it.widths[0]+6)+' 7.5h.5v5h-.5z"/><path d="M'+(it.widths[0]+6.5)+' 6.5l-3 3v1l3 3" stroke="d5d5d5" fill="#fafafa"/>';}out+='</g>';if(it.logo){out+='<image x="5" y="3" width="'+(it.logoWidth)+'" height="14" xlink:href="'+(it.logo)+'"/>';}out+='<g fill="#333" text-anchor="middle" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-weight="700" font-size="110"><text x="'+(((it.widths[0]+it.logoWidth+it.logoPadding)/2)*10)+'" y="150" fill="#fff" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text><text x="'+(((it.widths[0]+it.logoWidth+it.logoPadding)/2)*10)+'" y="140" transform="scale(.1)" textLength="'+((it.widths[0]-(10+it.logoWidth+it.logoPadding))*10)+'">'+(it.escapedText[0])+'</text>';if((it.text[1] && it.text[1].length)){out+='<text x="'+((it.widths[0]+it.widths[1]/2+6)*10)+'" y="150" fill="#fff" transform="scale(.1)" textLength="'+((it.widths[1]-8)*10)+'">'+(it.escapedText[1])+'</text>';if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='<a target="_blank" xlink:href="'+(it.links[1] || it.links[0])+'">';}out+='<text id="rlink" x="'+((it.widths[0]+it.widths[1]/2+6)*10)+'" y="140" transform="scale(.1)" textLength="'+((it.widths[1]-8)*10)+'" lengthAdjust="spacing">'+(it.escapedText[1])+'</text>';if((it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)){out+='</a>';}out+=' ';}out+='</g>';if((it.links[0] && it.links[0].length)){out+='<a target="_blank" xlink:href="'+(it.links[0])+'">';}out+='<rect id="llink" stroke="#d5d5d5" fill="url(#a)" x=".5" y=".5" width="'+(it.widths[0])+'" height="19" rx="2"/>';if((it.links[0] && it.links[0].length)){out+='</a>';}out+='</svg>';return out;
}

const x = 5;

function escapeXml(s) {
  if (s === undefined || typeof s !== 'string') {
    return undefined
  } else {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const templateMap = {
  'flat': flat,
  'flat-square': flatSquare,
  'social': social,
  'for-the-badge': forTheBadge,
}



export function makeBadge({
  template,
  text,
  colorscheme,
  color,
  colorA,
  colorB,
  labelColor,
  logo,
  logoPosition,
  logoWidth,
  lwOverride,
  rwOverride,
  links = ['', ''],
}) {
  // String coercion and whitespace removal.
  text = text.map(value => `${value}`.trim())

  const [left, right] = text

  color = colorB
  labelColor = colorA


  if (!(template in templateMap)) {
    template = 'flat'
  }
  // if (template.startsWith('popout')) {
  //   if (logo) {
  //     logoPosition =
  //       logoPosition <= 10 && logoPosition >= -10 ? logoPosition : 0
  //     logoWidth = +logoWidth || 32
  //   } else {
  //     template = template.replace('popout', 'flat')
  //   }
  // }
  if (template === 'social') {
    text[0] = capitalize(text[0])
  } else if (template === 'for-the-badge') {
    text = text.map(value => value.toUpperCase())
  }

  let leftWidth = 0
  for(let i = 0; i < left.length; i += 1) {
    leftWidth += widthTable[left.charAt(i)]
  }
  if (leftWidth % 2 === 0) leftWidth += 1

  let rightWidth = 0
  for(let i = 0; i < right.length; i += 1) {
    rightWidth += widthTable[right.charAt(i)]
  }
  if (rightWidth % 2 === 0) rightWidth += 1

  leftWidth = lwOverride || leftWidth
  rightWidth = rwOverride || rightWidth


  // let leftWidth = (anafanafo(left) / 10) | 0
  // Increase chances of pixel grid alignment.
  if (leftWidth % 2 === 0) {
    leftWidth++
  }
  // let rightWidth = (anafanafo(right) / 10) | 0
  // Increase chances of pixel grid alignment.
  if (rightWidth % 2 === 0) {
    rightWidth++
  }

  logoWidth = +logoWidth || (logo ? 14 : 0)

  let logoPadding
  if (left.length === 0) {
    logoPadding = 0
  } else {
    logoPadding = logo ? 3 : 0
  }

  const context = {
    text: [left, right],
    escapedText: text.map(escapeXml),
    widths: [leftWidth + 10 + logoWidth + logoPadding, rightWidth + 10],
    links: links.map(escapeXml),
    logo: escapeXml(logo),
    logoPosition,
    logoWidth,
    logoPadding,
    colorA: labelColor,
    colorB: color,
    escapeXml,
  }

  return templateMap[template](context)
}


// example: 
// const badge = makeBadge({
//   text: ['coverage', '88%'],
//   colorA: '#5a5a5a',
//   colorB: '#4cc61e',
//   template: 'for-the-badge',
// })
