const fs = require('fs');
const file = 'app/[locale]/products/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// Replace old array references with new key-only maps
c = c.replace(/AAS_SUBS\.map\(\(\{ key: sk \}\)/g, 'AAS_SUB_KEYS.map((sk)');
c = c.replace(/MODULATORS_SUBS\.map\(\(\{ key: sk \}\)/g, 'MODULATORS_SUB_KEYS.map((sk)');
c = c.replace(/PEPTIDES_SUBS\.map\(\(\{ key: sk \}\)/g, 'PEPTIDES_SUB_KEYS.map((sk)');
c = c.replace(/WOMENS_SUBS\.map\(\(\{ key: sk \}\)/g, 'WOMENS_SUB_KEYS.map((sk)');

// Sexual Health - uses label directly, replace with tSub
c = c.replace(/SEXUAL_HEALTH_SUBS\.map\(\(\{ key: sk, label \}\)/g, 'SEXUAL_HEALTH_SUB_KEYS.map((sk)');
// Anti-Aging - uses label directly
c = c.replace(/ANTI_AGING_SUBS\.map\(\(\{ key: sk, label \}\)/g, 'ANTI_AGING_SUB_KEYS.map((sk)');

// Replace hardcoded >{label}</Link> in sexual health and anti-aging pills
// There are 2 occurrences - both should use tSub
c = c.replace(/>\{label\}<\/Link>/g, '>{tSub(sk as Parameters<typeof tSub>[0])}</Link>');

// Fix "Sexual Health" and "Anti-Aging" hardcoded category labels in pills
c = c.replace('>Sexual Health</Link>', '>{tCat("sexual-health")}</Link>');
c = c.replace('>Anti-Aging</Link>', '>{tCat("anti-aging")}</Link>');

// Fix Out of Stock
c = c.replace(/>Out of Stock\n(\s+)<\/span>/, '>{tP("outOfStock")}\n$1</span>');

// Fix No products found
c = c.replace(/>No products found<\/p>/, '>{tP("noProductsFound")}</p>');

// Fix Clear filters
c = c.replace(/>Clear filters<\/Link>/, '>{tP("clearFilters")}</Link>');

// Fix Price filter header
c = c.replace(/<span className="text-white font-semibold text-sm">Price, €<\/span>/, '<span className="text-white font-semibold text-sm">{tP("priceFilter")}</span>');

// Fix price range labels
c = c.replace(/\{ key: '0-20',  label: 'Up to €20' \}/, "{ key: '0-20',  label: tP('price0_20') }");
c = c.replace(/\{ key: '20-40', label: '€20 – €40' \}/, "{ key: '20-40', label: tP('price20_40') }");
c = c.replace(/\{ key: '40-60', label: '€40 – €60' \}/, "{ key: '40-60', label: tP('price40_60') }");
c = c.replace(/\{ key: '60\+',   label: 'Over €60'  \}/, "{ key: '60+',   label: tP('price60plus') }");

fs.writeFileSync(file, c, 'utf8');
console.log('done');
