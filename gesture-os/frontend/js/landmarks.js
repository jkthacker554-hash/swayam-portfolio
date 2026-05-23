/**
 * SVG hand skeleton — aligned with mirrored webcam feed.
 */

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
];

export class LandmarkRenderer {
  constructor(svgEl, particleSystem) {
    this.svg = svgEl;
    this.group = document.getElementById("hand-groups");
    this.particles = particleSystem;
    this.mirrorHud = true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }

  setMirror(mirror) {
    this.mirrorHud = mirror !== false;
  }

  _normToScreen(x, y) {
    // Landmarks already come from a mirrored frame — map 1:1 to screen
    const sx = this.mirrorHud ? x * this.width : (1 - x) * this.width;
    const sy = y * this.height;
    return { x: sx, y: sy };
  }

  render(hands) {
    this.group.innerHTML = "";
    if (!hands?.length) return;

    hands.forEach((hand, hi) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "hand-group");

      const pts = hand.landmarks.map((lm) => this._normToScreen(lm[0], lm[1]));

      CONNECTIONS.forEach(([a, b]) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", pts[a].x);
        line.setAttribute("y1", pts[a].y);
        line.setAttribute("x2", pts[b].x);
        line.setAttribute("y2", pts[b].y);
        line.setAttribute("class", "landmark-line");
        g.appendChild(line);
      });

      pts.forEach((p, i) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", p.x);
        circle.setAttribute("cy", p.y);
        circle.setAttribute("r", i === 8 ? 6 : 4);
        circle.setAttribute("class", `landmark-point ${hi > 0 ? "secondary" : ""}`);
        g.appendChild(circle);

        if (this.particles && (i === 4 || i === 8)) {
          this.particles.emit(p.x, p.y, hi === 0 ? 0x00f0ff : 0xb24bf3);
        }
      });

      this.group.appendChild(g);
    });
  }
}
