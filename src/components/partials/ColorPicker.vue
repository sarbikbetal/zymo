<template>
  <div id="color-picker">
    <div :style="colorView" id="view"></div>
    <div id="colors">
      <input type="text" @input="convert" id="txt" value />
      <input
        :style="hbar"
        class="inp"
        @input="update"
        type="range"
        id="inp1"
        min="0"
        max="360"
        v-model="hi"
        draggable="false"
      />
      <input
        :style="sbar"
        class="inp"
        @input="update"
        type="range"
        id="inp2"
        min="0"
        max="100"
        v-model="si"
        draggable="false"
      />
      <input
        :style="lbar"
        class="inp"
        @input="update"
        type="range"
        id="inp3"
        min="0"
        max="100"
        v-model="li"
        draggable="false"
      />
    </div>
  </div>
</template>


<script>
export default {
  name: "ColorPicker",
  data: function() {
    return { h: [], s: [], l: [], hi: 331, si: 100, li: 50 };
  },
  methods: {
    hslCalc() {
      var root = document.documentElement;
      (this.h = []), (this.s = []), (this.l = []);
      for (var i = 0; i < 360; i++) {
        this.h.push("hsl(" + (i + 1) + ", " + 100 + "%, " + 50 + "%)");
      }
      for (var i = 0; i < 100; i++) {
        this.s.push("hsl(" + this.hi + ", " + i + "%, 50%)");
        this.l.push("hsl(" + this.hi + ", 100%, " + i + "%)");
      }

      root.style.setProperty("--color1", "hsl(" + this.hi + ", 100%, 50%)");
      root.style.setProperty(
        "--color2",
        "hsl(" + this.hi + ", " + this.si + "%, 50%)"
      );
      root.style.setProperty(
        "--color3",
        "hsl(" + this.hi + ", 100%, " + this.li + "%)"
      );
    },

    hexCalc() {
      var str = window.getComputedStyle(view).backgroundColor;
      str = str.replace("rgb", "");
      str = str.replace("(", "");
      str = str.replace(")", "");
      str = str.split(",");
      var hex = [0, 0, 0];
      hex[0] = parseFloat(str[0]).toString(16);
      hex[1] = parseFloat(str[1]).toString(16);
      hex[2] = parseFloat(str[2]).toString(16);

      if (hex[0].length < 2) hex[0] = "0" + hex[0];
      if (hex[1].length < 2) hex[1] = "0" + hex[1];
      if (hex[2].length < 2) hex[2] = "0" + hex[2];

      hex = "#" + hex.join("");
      txt.value = hex;
      return hex;
    },
    convert(e) {
      var str = e.target.value;

      str = str.replace("#", "");
      var isHex = /^[0-9A-F]{6}$/i.test(str);

      if (isHex) {
        let r = parseInt(str.slice(0, 2), 16);
        let g = parseInt(str.slice(2, 4), 16);
        let b = parseInt(str.slice(4, 6), 16);
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
          cmax = Math.max(r, g, b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.hi = h;
        this.si = s;
        this.li = l;

        this.hslCalc();
        //   if (socket.connected) socket.emit("color", str);
      }
    },
    update() {
      this.hslCalc();
      let hex = this.hexCalc();

      // if (socket.connected) socket.emit("color", hex);
    }
  },
  computed: {
    colorView: function() {
      return (
        "background: hsl(" + this.hi + ", " + this.si + "%, " + this.li + "%)"
      );
    },
    hbar: function() {
      return "background: linear-gradient(to right, " + this.h.join(", ") + ")";
    },
    sbar: function() {
      return "background: linear-gradient(to right, " + this.s.join(", ") + ")";
    },
    lbar: function() {
      return "background: linear-gradient(to right, " + this.l.join(", ") + ")";
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.update();
    });
  }
};
</script>


<style scoped>
*:focus {
  outline: none;
}
:root {
  --color1: hsl(1, 100%, 50%);
  --color2: hsl(1, 100%, 50%);
  --color3: hsl(1, 100%, 50%);
}
#color-picker {
  margin: 20px auto;
  width: 300.1499938964844px;
  height: 340px;
  background: white;
  left: 50%;
  top: 50%;
  text-align: center;
  resize: none;
}
#view {
  margin: 0px auto;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
}
#colors {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 50%;
}
.inp {
  width: 90%;
  height: 8px;
  border-radius: 20px;
  margin: 13px 0;
}
#inp1,
#inp2,
#inp3 {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: linear-gradient();
}
#inp1::-webkit-slider-thumb {
  background: var(--color1);
}
#inp2::-webkit-slider-thumb {
  background: var(--color2);
}
#inp3::-webkit-slider-thumb {
  background: var(--color3);
}

.inp::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: solid 2px white;
  background: #f2f2f2;
  /* box-shadow: inset 0 0 2px silver; */
  border-radius: 50%;
}
input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  width: 25px;
  height: 25px;
  border: solid 1px #f2f2f2;
  background: #f2f2f2;
  box-shadow: inset 0 0 2px silver;
  border-radius: 50%;
}
#txt {
  width: 90px;
  margin: 13px 0;
  padding: 8px;
  border: solid 1px silver;
  border-radius: 5px;
  text-align: center;
  background: #ffffff;
}
</style>