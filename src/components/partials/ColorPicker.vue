<template>
  <div id="color-picker">
    <div :style="{backgroundColor: hex}" id="view"></div>
    <div id="colors">
      <div class="flex justify-center">
        <InputBox class="text-center my-3" style="width: 90px" @input="convert" v-model="hex" />
        <FlatButton class="h-8 my-4 mx-2" @click.native="addColor">
          <img src="/img/icons/add.svg" alt="add" />
        </FlatButton>
      </div>
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
import InputBox from "./InputBox";
import FlatButton from "./FlatButton";

export default {
  name: "ColorPicker",
  components: {
    InputBox,
    FlatButton
  },
  data: function() {
    return {
      h: [],
      s: [],
      l: [],
      hi: 331,
      si: 100,
      li: 50,
      hex: "#ff007b"
    };
  },
  methods: {
    hslCalc() {
      var root = document.documentElement;
      // Generte the gradients for the sliders
      (this.h = []), (this.s = []), (this.l = []);
      for (var i = 0; i < 360; i++) {
        this.h.push("hsl(" + (i + 1) + ", " + 100 + "%, " + 50 + "%)");
      }
      for (var i = 0; i < 100; i++) {
        this.s.push("hsl(" + this.hi + ", " + i + "%, 50%)");
        this.l.push("hsl(" + this.hi + ", 100%, " + i + "%)");
      }

      // Set the sliders
      root.style.setProperty("--color1", "hsl(" + this.hi + ", 100%, 50%)");
      root.style.setProperty(
        "--color2",
        "hsl(" + this.hi + ", " + this.si + "%, 50%)"
      );
      root.style.setProperty(
        "--color3",
        "hsl(" + this.hi + ", 100%, " + this.li + "%)"
      );

      // Get the hsl value and convert it to hex
      let h = this.hi,
        s = this.si / 100,
        l = this.li / 100;

      let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

      if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      var hex = [r, g, b];
      hex[0] = parseFloat(hex[0]).toString(16);
      hex[1] = parseFloat(hex[1]).toString(16);
      hex[2] = parseFloat(hex[2]).toString(16);

      if (hex[0].length < 2) hex[0] = "0" + hex[0];
      if (hex[1].length < 2) hex[1] = "0" + hex[1];
      if (hex[2].length < 2) hex[2] = "0" + hex[2];

      hex = "#" + hex.join("");
      this.hex = hex;
    },
    convert(e) {
      var str = e.target.value;

      str = str.replace("#", "");
      var isHex = /^[0-9A-F]{6}$/i.test(str);

      if (isHex) {
        this.hex = str;
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
        this.emitColor();
      }
    },
    update() {
      this.hslCalc();
      this.emitColor();
    },
    emitColor() {
      this.$emit("color", this.hex);
    },
    addColor() {
      this.$emit("add", this.hex);
    }
  },
  computed: {
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
</style>