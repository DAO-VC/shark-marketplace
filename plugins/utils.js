/* eslint-disable */

import Vue from "vue";
import { Base64 } from "js-base64";
import Fingerprint2 from "fingerprintjs2";

const WAValidator = require("multicoin-address-validator");

Vue.prototype.$base64 = Base64;
Vue.prototype.$toFixed = function (num, fixed) {
  if (!fixed) {
    fixed = 2;
  }

  const re = new RegExp("^-?\\d+(?:\\d{0," + (fixed || -1) + "})?");
  return num.toFixed(10).toString().match(re)[0];
};
Vue.prototype.$isAddress = function (address, coinType) {
  let status = true;

  try {
    status = WAValidator.validate(address, coinType.toUpperCase());
  } catch (e) {
    console.error(e);
  }

  return status;
};

let fpInt = null;
const fingerprint = async function (options = {}, hash = true) {
  const components = await Fingerprint2.getPromise(options);
  if (!hash) { return components; }
  const values = components.map(function (component) {
    return component.value;
  });
  return Fingerprint2.x64hash128(values.join(""), 31);
};

const fingerint = async function () {
  // fpInt = fpInt || (await fingerprint()).replace(/[^0-9]/g, "").substr(0, 5);
  fpInt = fpInt ||
    (await fingerprint()).replace(new RegExp("[^0-9]", "g"), "").substr(0, 5);
  return fpInt;
};
fingerint();

Vue.prototype.$fingerprint = fingerprint;
Vue.prototype.$fingerint = fingerint;

let client = null;
let staticParams = {};
const socket = {

  async emit (name, params = {}) {
    try {
      params.fp = await fingerprint();
      this.connect();
      console.log({ name, params });
      client.emit(name, params);
    } catch (err) {
      throw err;
    }
  },

  off (event, funct) {
    this.connect();
    client.off(event, funct);
  },

  on (event, funct) {
    this.connect();
    client.on(event, funct);
  },

  connect () {
    if (client) { return; }

    const params = {
      secure: true,
      forceNew: true
    };

    params.head = {
      token: window.$nuxt.$store.getters.token ?? ""
    };
    params.extraHeaders = {
      Authorization: window.$nuxt.$store.getters.token ?? ""
    };

    client = window.io.connect("/", params);

    client.on("connect", function () {
      console.log("connect", "connected");
    }).on("connect_error", function (a, err) {
      console.log("connect_error", a, err);
    }).on("connect_timeout", function () {
      console.log("connect_timeout");
    }).on("reconnect", function (attempt) {
      // console. log('reconnect', 'Attempt #' + attempt);
    }).on("reconnecting", function (attempt) {
      console.log("reconnecting", "Attempt #" + attempt);
    }).on("reconnect_attempt", function () {
      console.log("reconnect_attempt");
    }).on("reconnect_error", function (err) {
      console.log("reconnect_error", err);
    }).on("reconnect_failed", function () {
      console.log("reconnect_failed");
    });
  },

  logout () {
    staticParams = {};
  },

  get () {
    return io;
  },

  disconnect () {
    if (!io) { return; }
    io.close();
  }
};

Vue.prototype.$socket = socket;

Vue.prototype.$parseFloat = function (float) {
  const str = float + "";
  const arr = [];
  for (const s of str) {
    if (arr.length > 0 && arr[arr.length - 1] !== "0" && arr[arr.length - 1] !==
      "." && arr[arr.length - 1] !== ",") { break; }
    arr.push(s);
  }
  return parseFloat(arr.join(""));
};

const date = {
  toString (d, h = false, m = false, s = false, UTC = false) {
    let hh = UTC ? d.getUTCHours().toString() : d.getHours().toString();
    let mm = UTC ? d.getUTCMinutes().toString() : d.getMinutes().toString();
    let ss = UTC ? d.getUTCSeconds().toString() : d.getSeconds().toString();
    if (hh.length < 2) { hh = "0" + hh; }
    if (mm.length < 2) { mm = "0" + mm; }
    if (ss.length < 2) { ss = "0" + ss; }

    const res = [];
    if (h) { res.push(hh); }
    if (m) { res.push(mm); }
    if (s) { res.push(ss); }
    return res.join(":");
  }
};

Vue.prototype.$date = date;

Vue.prototype.$sleep = async function (ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
};

/*

Vue.prototype.$encode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
  function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));

Vue.prototype.$decode = str => atob(str).split('').map(function (c) {
  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''); */
