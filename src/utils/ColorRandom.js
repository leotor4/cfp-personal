export default function ColorRandom() {
  const colors = [
    "#c20794",
    "#a7be00",
    "#ff379f",
    "#d3c800",
    "#ca007f",
    "#e8fb84",
    "#db67bb",
    "#ffc80f",
    "#a84379",
    "#fffc7a",
    "#ff3f87",
    "#c9dd64",
    "#ce0051",
    "#f7ffa6",
    "#ff0036",
    "#ecf0c6",
    "#e30047",
    "#9a9f00",
    "#ff8ccb",
    "#ea9ad1",
    "#be9300",
    "#b0659a",
    "#e98b00",
    "#d4a1c3",
    "#db4400",
    "#fffabc",
    "#ff4347",
    "#a0ae54",
    "#ff7a9d",
    "#ff5b23",
    "#a7ac7f",
    "#c52d0a",
    "#ffccd2",
    "#e77300",
    "#a97f88",
    "#ffb050",
    "#9e505f",
    "#a27500",
    "#ff9fa3",
    "#975900",
    "#c4ac91",
    "#b73e2b",
    "#ffbb76",
    "#92584f",
    "#ff8355",
    "#a54e37",
    "#ff8f75",
  ]; // http://medialab.github.io/iwanthue/ -> Gerador de paletas

  const selectedColor = colors[parseInt(Math.random() * 50)]; // Consertar para gerar sequencialmente (não aleatório)

  // return selectedColor;
  let angle = 360 * Math.random()
  if (angle > 100 && angle < 320) angle -= 90
  return (
    "hsl(" +
    angle +
    "," +
    (55 + 70 * Math.random()) +
    "%," +
    (75 + 15 * Math.random()) +
    "%)"
  );
}
