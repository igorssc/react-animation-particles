'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var configDefaultParticles = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#199ada",
        },
        shape: {
            type: ["circle", "triangle", "star", "polygon", "edge"],
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5,
            },
            image: {
                src: "",
                width: 300,
                height: 300,
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#199ada",
            opacity: 0.3,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false,
                mode: "grab",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 30,
                size: 4,
                duration: 2,
                opacity: 0.8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: false,
};

var isInArray = function (value, array) {
    return array.indexOf(value) > -1;
};

var canvasPropsEl;
var setCanvasPropsEl = function (el) {
    canvasPropsEl = el;
};

var System = /** @class */ (function () {
    function System() {
        this.retina = false;
        this.pushing = false;
        this.particles = [];
    }
    return System;
}());

var requestAnimFrame = window.requestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
var cancelRequestAnimFrame = window.cancelAnimationFrame || clearTimeout;

var drawShape = function (c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);
    for (var i = 0; i < sideCount; i++) {
        c.lineTo(sideLength, 0);
        c.translate(sideLength, 0);
        c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();
};

var attractParticles = function (p1, p2) {
    /* condensed particles */
    var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= system.configParticlesFinal.particles.line_linked.distance) {
        var ax = dx /
            (system.configParticlesFinal.particles.move.attract.rotateX * 1000), ay = dy /
            (system.configParticlesFinal.particles.move.attract.rotateY * 1000);
        p1.vx -= ax;
        p1.vy -= ay;
        p2.vx += ax;
        p2.vy += ay;
    }
};

var bounceParticles = function (p1, p2) {
    var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy), dist_p = p1.radius + p2.radius;
    if (dist <= dist_p) {
        p1.vx = -p1.vx;
        p1.vy = -p1.vy;
        p2.vx = -p2.vx;
        p2.vy = -p2.vy;
    }
};

var linkParticles = function (p1, p2) {
    var _a, _b, _c, _d, _e;
    var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= system.configParticlesFinal.particles.line_linked.distance) {
        var opacity_line = system.configParticlesFinal.particles.line_linked.opacity -
            dist /
                (1 / system.configParticlesFinal.particles.line_linked.opacity) /
                system.configParticlesFinal.particles.line_linked.distance;
        if (opacity_line > 0) {
            /* style */
            var color_line = system.color_rgb_line;
            canvasPropsEl.ctx &&
                (canvasPropsEl.ctx.strokeStyle =
                    "rgba(" +
                        color_line.r +
                        "," +
                        color_line.g +
                        "," +
                        color_line.b +
                        "," +
                        opacity_line +
                        ")");
            canvasPropsEl.ctx &&
                (canvasPropsEl.ctx.lineWidth =
                    system.configParticlesFinal.particles.line_linked.width);
            //canvasPropsEl.ctx.lineCap = 'round'; /* performance issue */
            /* path */
            (_a = canvasPropsEl.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
            (_b = canvasPropsEl.ctx) === null || _b === void 0 ? void 0 : _b.moveTo(p1.x, p1.y);
            (_c = canvasPropsEl.ctx) === null || _c === void 0 ? void 0 : _c.lineTo(p2.x, p2.y);
            (_d = canvasPropsEl.ctx) === null || _d === void 0 ? void 0 : _d.stroke();
            (_e = canvasPropsEl.ctx) === null || _e === void 0 ? void 0 : _e.closePath();
        }
    }
};

var bubbleParticle = function (p) {
    /* on hover event */
    if (system.configParticlesFinal.interactivity.events.onhover.enable &&
        (system.configParticlesFinal.interactivity.events.onhover.mode ===
            "bubble" ||
            (system.configParticlesFinal.interactivity.events.onhover.mode instanceof
                Array &&
                isInArray("bubble", system.configParticlesFinal.interactivity.events.onhover.mode)))) {
        var dx_mouse = p.x - system.interactivity_mouse_pos_x, dy_mouse = p.y - system.interactivity_mouse_pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse), ratio = 1 -
            dist_mouse /
                system.configParticlesFinal.interactivity.modes.bubble.distance;
        var init = function () {
            p.opacity_bubble = p.opacity;
            p.radius_bubble = p.radius;
        };
        /* mousemove - check ratio */
        if (dist_mouse <=
            system.configParticlesFinal.interactivity.modes.bubble.distance) {
            if (ratio >= 0 && system.interactivityStatus === "mousemove") {
                /* size */
                if (system.configParticlesFinal.interactivity.modes.bubble.size !==
                    system.configParticlesFinal.particles.size.value) {
                    if (system.configParticlesFinal.interactivity.modes.bubble.size >
                        system.configParticlesFinal.particles.size.value) {
                        var size = p.radius +
                            system.configParticlesFinal.interactivity.modes.bubble.size *
                                ratio;
                        if (size >= 0) {
                            p.radius_bubble = size;
                        }
                    }
                    else {
                        var dif = p.radius -
                            system.configParticlesFinal.interactivity.modes.bubble.size, size = p.radius - dif * ratio;
                        if (size > 0) {
                            p.radius_bubble = size;
                        }
                        else {
                            p.radius_bubble = 0;
                        }
                    }
                }
                /* opacity */
                if (system.configParticlesFinal.interactivity.modes.bubble.opacity !==
                    system.configParticlesFinal.particles.opacity.value) {
                    if (system.configParticlesFinal.interactivity.modes.bubble.opacity >
                        system.configParticlesFinal.particles.opacity.value) {
                        var opacity = system.configParticlesFinal.interactivity.modes.bubble.opacity *
                            ratio;
                        if (opacity > p.opacity &&
                            opacity <=
                                system.configParticlesFinal.interactivity.modes.bubble.opacity) {
                            p.opacity_bubble = opacity;
                        }
                    }
                    else {
                        var opacity = p.opacity -
                            (system.configParticlesFinal.particles.opacity.value -
                                system.configParticlesFinal.interactivity.modes.bubble
                                    .opacity) *
                                ratio;
                        if (opacity < p.opacity &&
                            opacity >=
                                system.configParticlesFinal.interactivity.modes.bubble.opacity) {
                            p.opacity_bubble = opacity;
                        }
                    }
                }
            }
        }
        else {
            init();
        }
        /* mouseleave */
        if (system.interactivityStatus === "mouseleave") {
            init();
        }
    }
    else if (
    /* on click event */
    system.configParticlesFinal.interactivity.events.onclick.enable &&
        (system.configParticlesFinal.interactivity.events.onclick.mode ===
            "bubble" ||
            (system.configParticlesFinal.interactivity.events.onclick.mode instanceof
                Array &&
                isInArray("bubble", system.configParticlesFinal.interactivity.events.onclick.mode)))) {
        if (system.bubble_clicking) {
            system.dx_mouse = p.x - system.interactivity_mouse_click_pos_x;
            system.dy_mouse = p.y - system.interactivity_mouse_click_pos_y;
            system.dist_mouse = Math.sqrt(system.dx_mouse * system.dx_mouse + system.dy_mouse * system.dy_mouse);
            system.time_spent = (new Date().getTime() - system.click_time) / 1000;
            if (system.time_spent >
                system.configParticlesFinal.interactivity.modes.bubble.duration) {
                system.bubble_duration_end = true;
            }
            if (system.time_spent >
                system.configParticlesFinal.interactivity.modes.bubble.duration * 2) {
                system.bubble_clicking = false;
                system.bubble_duration_end = false;
            }
        }
        var process_1 = function (bubble_param, particles_param, p_obj_bubble, p_obj, id) {
            if (bubble_param !== particles_param) {
                if (!system.bubble_duration_end) {
                    if (system.dist_mouse <=
                        system.configParticlesFinal.interactivity.modes.bubble.distance) {
                        var objProcess = void 0;
                        if (p_obj_bubble !== undefined)
                            objProcess = p_obj_bubble;
                        else
                            objProcess = p_obj;
                        if (objProcess !== bubble_param) {
                            var value = p_obj -
                                (system.time_spent * (p_obj - bubble_param)) /
                                    system.configParticlesFinal.interactivity.modes.bubble
                                        .duration;
                            if (id === "size")
                                p.radius_bubble = value;
                            if (id === "opacity")
                                p.opacity_bubble = value;
                        }
                    }
                    else {
                        if (id === "size")
                            p.radius_bubble = undefined;
                        if (id === "opacity")
                            p.opacity_bubble = undefined;
                    }
                }
                else {
                    if (p_obj_bubble !== undefined) {
                        var value_tmp = p_obj -
                            (system.time_spent * (p_obj - bubble_param)) /
                                system.configParticlesFinal.interactivity.modes.bubble
                                    .duration, dif = bubble_param - value_tmp;
                        var value = bubble_param + dif;
                        if (id === "size")
                            p.radius_bubble = value;
                        if (id === "opacity")
                            p.opacity_bubble = value;
                    }
                }
            }
        };
        if (system.bubble_clicking) {
            /* size */
            process_1(system.configParticlesFinal.interactivity.modes.bubble.size, system.configParticlesFinal.particles.size.value, p.radius_bubble, p.radius, "size");
            /* opacity */
            process_1(system.configParticlesFinal.interactivity.modes.bubble.opacity, system.configParticlesFinal.particles.opacity.value, p.opacity_bubble, p.opacity, "opacity");
        }
    }
};

var grabParticle = function (p) {
    var _a, _b, _c, _d, _e;
    if (system.configParticlesFinal.interactivity.events.onhover.enable &&
        system.interactivityStatus === "mousemove") {
        var dx_mouse = p.x - system.interactivity_mouse_pos_x, dy_mouse = p.y - system.interactivity_mouse_pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        /* draw a line between the cursor and the particle if the distance between them is under the config distance */
        if (dist_mouse <=
            system.configParticlesFinal.interactivity.modes.grab.distance) {
            var opacity_line = system.configParticlesFinal.interactivity.modes.grab.line_linked
                .opacity -
                dist_mouse /
                    (1 /
                        system.configParticlesFinal.interactivity.modes.grab.line_linked
                            .opacity) /
                    system.configParticlesFinal.interactivity.modes.grab.distance;
            if (opacity_line > 0) {
                /* style */
                var color_line = system.color_rgb_line;
                canvasPropsEl.ctx &&
                    (canvasPropsEl.ctx.strokeStyle =
                        "rgba(" +
                            color_line.r +
                            "," +
                            color_line.g +
                            "," +
                            color_line.b +
                            "," +
                            opacity_line +
                            ")");
                canvasPropsEl.ctx &&
                    (canvasPropsEl.ctx.lineWidth =
                        system.configParticlesFinal.particles.line_linked.width);
                //canvasPropsEl.ctx.lineCap = 'round'; /* performance issue */
                /* path */
                (_a = canvasPropsEl.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
                (_b = canvasPropsEl.ctx) === null || _b === void 0 ? void 0 : _b.moveTo(p.x, p.y);
                (_c = canvasPropsEl.ctx) === null || _c === void 0 ? void 0 : _c.lineTo(system.interactivity_mouse_pos_x, system.interactivity_mouse_pos_y);
                (_d = canvasPropsEl.ctx) === null || _d === void 0 ? void 0 : _d.stroke();
                (_e = canvasPropsEl.ctx) === null || _e === void 0 ? void 0 : _e.closePath();
            }
        }
    }
};

var clamp = function (number, min, max) {
    return Math.min(Math.max(number, min), max);
};

var repulseParticle = function (p) {
    if (system.configParticlesFinal.interactivity.events.onhover.enable &&
        (system.configParticlesFinal.interactivity.events.onhover.mode ===
            "repulse" ||
            (system.configParticlesFinal.interactivity.events.onhover.mode instanceof
                Array &&
                isInArray("repulse", system.configParticlesFinal.interactivity.events.onhover.mode))) &&
        system.interactivityStatus === "mousemove") {
        var dx_mouse = p.x - system.interactivity_mouse_pos_x, dy_mouse = p.y - system.interactivity_mouse_pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        var normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse }, repulseRadius = system.configParticlesFinal.interactivity.modes.repulse.distance, velocity = 100, repulseFactor = clamp((1 / repulseRadius) *
            (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) *
            repulseRadius *
            velocity, 0, 50);
        var pos = {
            x: p.x + normVec.x * repulseFactor,
            y: p.y + normVec.y * repulseFactor,
        };
        if (system.configParticlesFinal.particles.move.out_mode === "bounce") {
            if (pos.x - p.radius > 0 && pos.x + p.radius < canvasPropsEl.w)
                p.x = pos.x;
            if (pos.y - p.radius > 0 && pos.y + p.radius < canvasPropsEl.h)
                p.y = pos.y;
        }
        else {
            p.x = pos.x;
            p.y = pos.y;
        }
    }
    else if (system.configParticlesFinal.interactivity.events.onclick.enable &&
        (system.configParticlesFinal.interactivity.events.onclick.mode ===
            "repulse" ||
            (system.configParticlesFinal.interactivity.events.onclick.mode instanceof
                Array &&
                isInArray("repulse", system.configParticlesFinal.interactivity.events.onclick.mode)))) {
        if (!system.repulse_finish) {
            system.repulse_count++;
            if (system.repulse_count === system.particles.length) {
                system.repulse_finish = true;
            }
        }
        if (system.repulse_clicking) {
            var repulseRadius = Math.pow(system.configParticlesFinal.interactivity.modes.repulse.distance / 6, 3);
            var dx_1 = system.interactivity_mouse_click_pos_x - p.x, dy_1 = system.interactivity_mouse_click_pos_y - p.y, d = dx_1 * dx_1 + dy_1 * dy_1;
            var force_1 = (-repulseRadius / d) * 1;
            var process_1 = function () {
                var f = Math.atan2(dy_1, dx_1);
                p.vx = force_1 * Math.cos(f);
                p.vy = force_1 * Math.sin(f);
                if (system.configParticlesFinal.particles.move.out_mode === "bounce") {
                    var pos = {
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                    };
                    if (pos.x + p.radius > canvasPropsEl.w)
                        p.vx = -p.vx;
                    else if (pos.x - p.radius < 0)
                        p.vx = -p.vx;
                    if (pos.y + p.radius > canvasPropsEl.h)
                        p.vy = -p.vy;
                    else if (pos.y - p.radius < 0)
                        p.vy = -p.vy;
                }
            };
            // default
            if (d <= repulseRadius) {
                process_1();
            }
        }
        else {
            if (system.repulse_clicking === false) {
                p.vx = p.vx_i;
                p.vy = p.vy_i;
            }
        }
    }
};

var particlesUpdate = function () {
    var _loop_1 = function (i) {
        /* the particle */
        var p = system.particles[i];
        /* move the particle */
        if (system.configParticlesFinal.particles.move.enable) {
            var ms = system.configParticlesFinal.particles.move.speed / 2;
            p.x += p.vx * ms;
            p.y += p.vy * ms;
        }
        /* change opacity status */
        if (system.configParticlesFinal.particles.opacity.anim.enable) {
            if (p.opacity_status === true) {
                if (p.opacity >= system.configParticlesFinal.particles.opacity.value)
                    p.opacity_status = false;
                p.opacity += p.vo;
            }
            else {
                if (p.opacity <=
                    system.configParticlesFinal.particles.opacity.anim.opacity_min)
                    p.opacity_status = true;
                p.opacity -= p.vo;
            }
            if (p.opacity < 0)
                p.opacity = 0;
        }
        /* change size */
        if (system.configParticlesFinal.particles.size.anim.enable) {
            if (p.size_status === true) {
                if (p.radius >= system.configParticlesFinal.particles.size.value)
                    p.size_status = false;
                p.radius += p.vs;
            }
            else {
                if (p.radius <= system.configParticlesFinal.particles.size.anim.size_min)
                    p.size_status = true;
                p.radius -= p.vs;
            }
            if (p.radius < 0)
                p.radius = 0;
        }
        var new_pos = void 0;
        /* change particle position if it is out of canvas */
        if (system.configParticlesFinal.particles.move.out_mode === "bounce") {
            new_pos = {
                x_left: p.radius,
                x_right: canvasPropsEl.w,
                y_top: p.radius,
                y_bottom: canvasPropsEl.h,
            };
        }
        else {
            new_pos = {
                x_left: -p.radius,
                x_right: canvasPropsEl.w + p.radius,
                y_top: -p.radius,
                y_bottom: canvasPropsEl.h + p.radius,
            };
        }
        if (p.x - p.radius > canvasPropsEl.w) {
            p.x = new_pos.x_left;
            p.y = Math.random() * canvasPropsEl.h;
        }
        else if (p.x + p.radius < 0) {
            p.x = new_pos.x_right;
            p.y = Math.random() * canvasPropsEl.h;
        }
        if (p.y - p.radius > canvasPropsEl.h) {
            p.y = new_pos.y_top;
            p.x = Math.random() * canvasPropsEl.w;
        }
        else if (p.y + p.radius < 0) {
            p.y = new_pos.y_bottom;
            p.x = Math.random() * canvasPropsEl.w;
        }
        /* out of canvas modes */
        switch (system.configParticlesFinal.particles.move.out_mode) {
            case "bounce":
                if (p.x + p.radius > canvasPropsEl.w)
                    p.vx = -p.vx;
                else if (p.x - p.radius < 0)
                    p.vx = -p.vx;
                if (p.y + p.radius > canvasPropsEl.h)
                    p.vy = -p.vy;
                else if (p.y - p.radius < 0)
                    p.vy = -p.vy;
                break;
        }
        /* events */
        var cases = function (c) {
            switch (c) {
                case "grab":
                    grabParticle(p);
                    break;
                case "bubble":
                    bubbleParticle(p);
                    break;
                case "repulse":
                    repulseParticle(p);
                    break;
            }
        };
        if (system.configParticlesFinal.interactivity.events.onhover.mode instanceof
            Array) {
            system.configParticlesFinal.interactivity.events.onhover.mode.forEach(function (mode) { return cases(mode); });
        }
        else {
            cases(system.configParticlesFinal.interactivity.events.onhover.mode);
        }
        /* interaction auto between particles */
        if (system.configParticlesFinal.particles.line_linked.enable ||
            system.configParticlesFinal.particles.move.attract.enable) {
            for (var j = i + 1; j < system.particles.length; j++) {
                var p2 = system.particles[j];
                /* link particles */
                if (system.configParticlesFinal.particles.line_linked.enable) {
                    linkParticles(p, p2);
                }
                /* attract particles */
                if (system.configParticlesFinal.particles.move.attract.enable) {
                    attractParticles(p, p2);
                }
                /* bounce particles */
                if (system.configParticlesFinal.particles.move.bounce) {
                    bounceParticles(p, p2);
                }
            }
        }
    };
    for (var i = 0; i < system.particles.length; i++) {
        _loop_1(i);
    }
};

var particlesDraw = function () {
    var _a;
    /* clear canvas */
    (_a = canvasPropsEl.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, canvasPropsEl.w, canvasPropsEl.h);
    /* update each particles param */
    particlesUpdate();
    /* draw each particle */
    for (var i = 0; i < system.particles.length; i++) {
        var p = system.particles[i];
        p.draw();
    }
};
var particleDraw = function (p) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (p.radius_bubble) {
        p.radius = p.radius_bubble;
    }
    if (p.opacity_bubble) {
        p.opacity = p.opacity_bubble;
    }
    var color_value;
    if (p.color.rgb) {
        color_value =
            "rgba(" +
                p.color.rgb.r +
                "," +
                p.color.rgb.g +
                "," +
                p.color.rgb.b +
                "," +
                p.opacity +
                ")";
    }
    else {
        color_value =
            "hsla(" +
                ((_a = p.color.hsl) === null || _a === void 0 ? void 0 : _a.h) +
                "," +
                ((_b = p.color.hsl) === null || _b === void 0 ? void 0 : _b.s) +
                "%," +
                ((_c = p.color.hsl) === null || _c === void 0 ? void 0 : _c.l) +
                "%," +
                p.opacity +
                ")";
    }
    canvasPropsEl.ctx && (canvasPropsEl.ctx.fillStyle = color_value);
    (_d = canvasPropsEl.ctx) === null || _d === void 0 ? void 0 : _d.beginPath();
    // eslint-disable-next-line default-case
    switch (p.shape) {
        case "circle":
            (_e = canvasPropsEl.ctx) === null || _e === void 0 ? void 0 : _e.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            break;
        case "edge":
            (_f = canvasPropsEl.ctx) === null || _f === void 0 ? void 0 : _f.rect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
            break;
        case "triangle":
            drawShape(canvasPropsEl.ctx, p.x - p.radius, p.y + p.radius / 1.66, p.radius * 2, 3, 2);
            break;
        case "polygon":
            drawShape(canvasPropsEl.ctx, p.x -
                p.radius /
                    (system.configParticlesFinal.particles.shape.polygon.nb_sides /
                        3.5), // startX
            p.y - p.radius / (2.66 / 3.5), // startY
            (p.radius * 2.66) /
                (system.configParticlesFinal.particles.shape.polygon.nb_sides / 3), // sideLength
            system.configParticlesFinal.particles.shape.polygon.nb_sides, // sideCountNumerator
            1 // sideCountDenominator
            );
            break;
        case "star":
            drawShape(canvasPropsEl.ctx, p.x -
                (p.radius * 2) /
                    (system.configParticlesFinal.particles.shape.polygon.nb_sides / 4), // startX
            p.y - p.radius / ((2 * 2.66) / 3.5), // startY
            (p.radius * 2 * 2.66) /
                (system.configParticlesFinal.particles.shape.polygon.nb_sides / 3), // sideLength
            system.configParticlesFinal.particles.shape.polygon.nb_sides, // sideCountNumerator
            2 // sideCountDenominator
            );
            break;
        case "image":
            var img_obj_1 = undefined;
            if (system.img_type === "svg") {
                img_obj_1 = p.img.obj;
            }
            else {
                img_obj_1 = system.img_obj;
            }
            var drawImage = function () {
                var _a;
                (_a = canvasPropsEl.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(img_obj_1, p.x - p.radius, p.y - p.radius, p.radius * 2, (p.radius * 2) / p.img.ratio);
            };
            if (img_obj_1) {
                drawImage();
            }
            break;
    }
    (_g = canvasPropsEl.ctx) === null || _g === void 0 ? void 0 : _g.closePath();
    if (system.configParticlesFinal.particles.shape.stroke.width > 0) {
        canvasPropsEl.ctx &&
            (canvasPropsEl.ctx.strokeStyle =
                system.configParticlesFinal.particles.shape.stroke.color);
        canvasPropsEl.ctx &&
            (canvasPropsEl.ctx.lineWidth =
                system.configParticlesFinal.particles.shape.stroke.width);
        (_h = canvasPropsEl.ctx) === null || _h === void 0 ? void 0 : _h.stroke();
    }
    (_j = canvasPropsEl.ctx) === null || _j === void 0 ? void 0 : _j.fill();
};

var draw = function () {
    if (system.configParticlesFinal.particles.shape.type === "image") {
        if (system.img_type === "svg") {
            if (system.count_svg >= system.configParticlesFinal.particles.number.value) {
                particlesDraw();
                if (!system.configParticlesFinal.particles.move.enable)
                    cancelRequestAnimFrame(system.drawAnimFrame);
                else
                    system.drawAnimFrame = requestAnimFrame(draw);
            }
            else {
                //console.log('still loading...');
                if (!system.img_error)
                    system.drawAnimFrame = requestAnimFrame(draw);
            }
        }
        else {
            if (system.img_obj !== undefined) {
                particlesDraw();
                if (!system.configParticlesFinal.particles.move.enable)
                    cancelRequestAnimFrame(system.drawAnimFrame);
                else
                    system.drawAnimFrame = requestAnimFrame(draw);
            }
            else {
                if (!system.img_error)
                    system.drawAnimFrame = requestAnimFrame(draw);
            }
        }
    }
    else {
        particlesDraw();
        if (!system.configParticlesFinal.particles.move.enable)
            cancelRequestAnimFrame(system.drawAnimFrame);
        else
            system.drawAnimFrame = requestAnimFrame(draw);
    }
};

var hexToRgb = function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

var retinaInit = function () {
    if (system.configParticlesFinal.retina_detect &&
        window.devicePixelRatio > 1) {
        canvasPropsEl.pxratio = window.devicePixelRatio;
        system.retina = true;
    }
    else {
        canvasPropsEl.pxratio = 1;
        system.retina = false;
    }
};

var canvasInit = function () {
    var _a;
    canvasPropsEl.ctx = (_a = canvasPropsEl.el) === null || _a === void 0 ? void 0 : _a.getContext("2d");
};

var canvasPaint = function () {
    var _a;
    (_a = canvasPropsEl.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, canvasPropsEl.w, canvasPropsEl.h);
};

var createSvgImg = function (color, opacity, img) {
    /* set color to svg element */
    var svgXml = system.source_svg, rgbHex = /#([0-9A-F]{3,6})/gi, coloredSvgXml = svgXml.replace(rgbHex, function () {
        var _a, _b, _c;
        var color_value;
        if (color.rgb) {
            color_value =
                "rgba(" +
                    color.rgb.r +
                    "," +
                    color.rgb.g +
                    "," +
                    color.rgb.b +
                    "," +
                    opacity +
                    ")";
        }
        else {
            color_value =
                "hsla(" +
                    ((_a = color.hsl) === null || _a === void 0 ? void 0 : _a.h) +
                    "," +
                    ((_b = color.hsl) === null || _b === void 0 ? void 0 : _b.s) +
                    "%," +
                    ((_c = color.hsl) === null || _c === void 0 ? void 0 : _c.l) +
                    "%," +
                    opacity +
                    ")";
        }
        return color_value;
    });
    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {
        type: "image/svg+xml;charset=utf-8",
    }), DOMURL = window.URL || window.webkitURL || window, url = DOMURL.createObjectURL(svg);
    /* create particle img obj */
    var finalImg = new Image();
    finalImg.addEventListener("load", function () {
        img && (img.obj = finalImg);
        img && (img.loaded = true);
        DOMURL.revokeObjectURL(url);
        system.count_svg++;
    });
    img.src = url;
};

var checkOverlap = function (p1, position) {
    for (var i = 0; i < system.particles.length; i++) {
        var p2 = system.particles[i];
        var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= p1.radius + p2.radius) {
            p1.x = position ? position.x : Math.random() * canvasPropsEl.w;
            p1.y = position ? position.y : Math.random() * canvasPropsEl.h;
            checkOverlap(p1);
        }
    }
};

var Particle = /** @class */ (function () {
    function Particle(color, opacity, opacity_status, size_status, vo, vs, radius, shape, vx, vx_i, vy, vy_i, x, y, img, opacity_bubble, radius_bubble) {
        var _this = this;
        this.color = color;
        this.opacity = opacity;
        this.opacity_status = opacity_status;
        this.size_status = size_status;
        this.vo = vo;
        this.vs = vs;
        this.radius = radius;
        this.shape = shape;
        this.vx = vx;
        this.vx_i = vx_i;
        this.vy = vy;
        this.vy_i = vy_i;
        this.x = x;
        this.y = y;
        this.img = img;
        this.draw = function () { return particleDraw(_this); };
        this.opacity_bubble = opacity_bubble;
        this.radius_bubble = radius_bubble;
    }
    return Particle;
}());

var particle = function (color, position) {
    var _a, _b, _c;
    /* size */
    var radius = (system.configParticlesFinal.particles.size.random ? Math.random() : 1) *
        system.configParticlesFinal.particles.size.value;
    var size_status = undefined;
    var vs = 0;
    if (system.configParticlesFinal.particles.size.anim.enable) {
        size_status = false;
        vs = system.configParticlesFinal.particles.size.anim.speed / 100;
        if (!system.configParticlesFinal.particles.size.anim.sync) {
            vs = vs * Math.random();
        }
    }
    /* position */
    var x = position ? position.x : Math.random() * canvasPropsEl.w;
    var y = position ? position.y : Math.random() * canvasPropsEl.h;
    /* check position  - into the canvas */
    if (x > canvasPropsEl.w - radius * 2)
        x = x - radius;
    else if (x < radius * 2)
        x = x + radius;
    if (y > canvasPropsEl.h - radius * 2)
        y = y - radius;
    else if (y < radius * 2)
        y = y + radius;
    /* check position - avoid overlap */
    if (system.configParticlesFinal.particles.move.bounce) {
        checkOverlap({ x: x, y: y, radius: radius }, position);
    }
    /* color */
    var finalColor = {};
    if (typeof color.value === "object") {
        if (color.value instanceof Array) {
            var color_selected = color.value[Math.floor(Math.random() *
                system.configParticlesFinal.particles.color
                    .value.length)];
            Object.assign(finalColor, { rgb: hexToRgb(color_selected) });
        }
        else {
            if (color.value.r && color.value.g && color.value.b) {
                Object.assign(finalColor, {
                    rgb: {
                        r: color.value.r,
                        g: color.value.g,
                        b: color.value.b,
                    },
                });
            }
            if (color.value.h && color.value.s && color.value.l) {
                Object.assign(finalColor, {
                    hsl: {
                        h: color.value.h,
                        s: color.value.s,
                        l: color.value.l,
                    },
                });
            }
        }
    }
    else if (color.value === "random") {
        Object.assign(finalColor, {
            rgb: {
                r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
                g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
                b: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
            },
        });
    }
    else if (typeof color.value === "string") {
        Object.assign(finalColor, { rgb: hexToRgb(color.value) });
    }
    /* opacity */
    var finalOpacity = (system.configParticlesFinal.particles.opacity.random ? Math.random() : 1) *
        system.configParticlesFinal.particles.opacity.value;
    var opacity_status = true;
    var vo = 0;
    if (system.configParticlesFinal.particles.opacity.anim.enable) {
        opacity_status = false;
        vo = system.configParticlesFinal.particles.opacity.anim.speed / 100;
        if (!system.configParticlesFinal.particles.opacity.anim.sync) {
            vo = vo * Math.random();
        }
    }
    /* animation - velocity for speed */
    var velbase;
    switch (system.configParticlesFinal.particles.move.direction) {
        case "top":
            velbase = { x: 0, y: -1 };
            break;
        case "top-right":
            velbase = { x: 0.5, y: -0.5 };
            break;
        case "right":
            velbase = { x: 1, y: -0 };
            break;
        case "bottom-right":
            velbase = { x: 0.5, y: 0.5 };
            break;
        case "bottom":
            velbase = { x: 0, y: 1 };
            break;
        case "bottom-left":
            velbase = { x: -0.5, y: 1 };
            break;
        case "left":
            velbase = { x: -1, y: 0 };
            break;
        case "top-left":
            velbase = { x: -0.5, y: -0.5 };
            break;
        default:
            velbase = { x: 0, y: 0 };
            break;
    }
    var vx;
    var vy;
    if (system.configParticlesFinal.particles.move.straight) {
        vx = velbase.x;
        vy = velbase.y;
        if (system.configParticlesFinal.particles.move.random) {
            vx = vx * Math.random();
            vy = vy * Math.random();
        }
    }
    else {
        vx = velbase.x + Math.random() - 0.5;
        vy = velbase.y + Math.random() - 0.5;
    }
    var vx_i = vx;
    var vy_i = vy;
    /* if shape is image */
    var shape = "circle";
    var shape_type = system.configParticlesFinal.particles.shape.type;
    if (typeof shape_type === "object") {
        if (shape_type instanceof Array) {
            var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
            shape = shape_selected;
        }
    }
    else {
        shape = shape_type;
    }
    var img = null;
    if (shape === "image") {
        var sh = system.configParticlesFinal.particles.shape;
        img = {
            src: ((_a = sh.image) === null || _a === void 0 ? void 0 : _a.src) || "",
            ratio: (((_b = sh.image) === null || _b === void 0 ? void 0 : _b.width) || 0) / (((_c = sh.image) === null || _c === void 0 ? void 0 : _c.height) || 0),
        };
        if (!img.ratio)
            img.ratio = 1;
        if (system.img_type === "svg" && system.source_svg) {
            createSvgImg(finalColor, finalOpacity, img);
            if (system.pushing) {
                img.loaded = false;
            }
        }
    }
    return new Particle(finalColor, finalOpacity, opacity_status, size_status, vo, vs, radius, shape, vx, vx_i, vy, vy_i, x, y, img);
};

var particlesCreate = function () {
    for (var i = 0; i < system.configParticlesFinal.particles.number.value; i++) {
        system.particles.push(particle(system.configParticlesFinal.particles.color));
    }
};

var particlesEmpty = function () {
    system.particles = [];
};

var pushParticles = function (nb, pos) {
    system.pushing = true;
    for (var i = 0; i < nb; i++) {
        system.particles.push(particle(system.configParticlesFinal.particles.color, {
            x: pos ? pos.pos_x : Math.random() * canvasPropsEl.w,
            y: pos ? pos.pos_y : Math.random() * canvasPropsEl.h,
        }));
        if (i === nb - 1) {
            if (!system.configParticlesFinal.particles.move.enable) {
                particlesDraw();
            }
            system.pushing = false;
        }
    }
};

var removeParticles = function (nb) {
    system.particles.splice(0, nb);
    if (!system.configParticlesFinal.particles.move.enable) {
        particlesDraw();
    }
};

var densityAutoParticles = function () {
    if (system.configParticlesFinal.particles.number.density.enable) {
        /* calc area */
        var area = (canvasPropsEl.w * canvasPropsEl.h) / 1000;
        if (system.retina) {
            area = area / ((canvasPropsEl.pxratio || 1) * 2);
        }
        /* calc number of particles based on density area */
        var nb_particles = (area * system.configParticlesFinal.particles.number.value) /
            system.configParticlesFinal.particles.number.density.value_area;
        /* add or remove X particles */
        var missing_particles = system.particles.length - nb_particles;
        if (missing_particles < 0)
            pushParticles(Math.abs(missing_particles));
        else
            removeParticles(missing_particles);
    }
};

var canvasSize = function () {
    canvasPropsEl.el && (canvasPropsEl.el.width = canvasPropsEl.w);
    canvasPropsEl.el && (canvasPropsEl.el.height = canvasPropsEl.h);
    if (system.configParticlesFinal &&
        system.configParticlesFinal.interactivity.events.resize) {
        window.addEventListener("resize", function () {
            var _a, _b;
            canvasPropsEl.w = ((_a = canvasPropsEl.el) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 1;
            canvasPropsEl.h =
                system.heightBackground || ((_b = canvasPropsEl.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 1;
            /* resize canvas */
            if (system.retina) {
                canvasPropsEl.w *= (canvasPropsEl === null || canvasPropsEl === void 0 ? void 0 : canvasPropsEl.pxratio) || 1;
                canvasPropsEl.h *= (canvasPropsEl === null || canvasPropsEl === void 0 ? void 0 : canvasPropsEl.pxratio) || 1;
            }
            canvasPropsEl.el && (canvasPropsEl.el.width = canvasPropsEl.w);
            canvasPropsEl.el && (canvasPropsEl.el.height = canvasPropsEl.h);
            /* repaint canvas on anim disabled */
            if (!system.configParticlesFinal.particles.move.enable) {
                particlesEmpty();
                particlesCreate();
                particlesDraw();
                densityAutoParticles();
            }
            /* density particles enabled */
            densityAutoParticles();
        });
    }
};

var init = function () {
    /* init canvas + particles */
    retinaInit();
    canvasInit();
    canvasSize();
    canvasPaint();
    particlesCreate();
    densityAutoParticles();
    /* particles.line_linked - convert hex colors to rgb */
    system.color_rgb_line = hexToRgb(system.configParticlesFinal.particles.line_linked.color);
};

var checkBeforeDraw = function () {
    // if shape is image
    if (system.configParticlesFinal.particles.shape.type === "image") {
        if (system.img_type === "svg" && system.source_svg === undefined) ;
        else {
            //console.log('images loaded! cancel check');
            cancelRequestAnimFrame(system.checkAnimFrame);
            if (!system.img_error) {
                init();
                draw();
            }
        }
    }
    else {
        init();
        draw();
    }
};

var eventsListeners = function () {
    /* events target element */
    if (system.configParticlesFinal.interactivity.detect_on === "window") {
        system.el = window;
    }
    else {
        system.el = canvasPropsEl.el;
    }
    /* detect mouse pos - on hover / click event */
    if (system.configParticlesFinal.interactivity.events.onhover.enable ||
        system.configParticlesFinal.interactivity.events.onclick.enable) {
        /* el on mousemove */
        system.el.addEventListener("mousemove", function (e) {
            var pos_x, pos_y;
            if (system.el === window) {
                pos_x = e.clientX;
                pos_y = e.clientY;
            }
            else {
                pos_x = e.offsetX || e.clientX;
                pos_y = e.offsetY || e.clientY;
            }
            system.interactivity_mouse_pos_x = pos_x;
            system.interactivity_mouse_pos_y = pos_y;
            if (system.retina) {
                system.interactivity_mouse_pos_x *=
                    canvasPropsEl.pxratio || 1;
                system.interactivity_mouse_pos_y *=
                    canvasPropsEl.pxratio || 1;
            }
            system.interactivityStatus = "mousemove";
        });
        /* el on onmouseleave */
        system.el.addEventListener("mouseleave", function (e) {
            system.interactivity_mouse_pos_x = null;
            system.interactivity_mouse_pos_y = null;
            system.interactivityStatus = "mouseleave";
        });
    }
    /* on click event */
    if (system.configParticlesFinal.interactivity.events.onclick.enable) {
        system.el.addEventListener("click", function () {
            system.interactivity_mouse_click_pos_x =
                system.interactivity_mouse_pos_x;
            system.interactivity_mouse_click_pos_y =
                system.interactivity_mouse_pos_y;
            system.click_time = new Date().getTime();
            if (system.configParticlesFinal.interactivity.events.onclick.enable) {
                var cases_1 = function (c) {
                    switch (c) {
                        case "push":
                            if (system.configParticlesFinal.particles.move.enable) {
                                pushParticles(system.configParticlesFinal.interactivity.modes.push
                                    .particles_nb, {
                                    pos_x: system.interactivity_mouse_pos_x,
                                    pos_y: system.interactivity_mouse_pos_y,
                                });
                            }
                            else {
                                if (system.configParticlesFinal.interactivity.modes.push
                                    .particles_nb === 1) {
                                    pushParticles(system.configParticlesFinal.interactivity.modes.push
                                        .particles_nb, {
                                        pos_x: system.interactivity_mouse_pos_x,
                                        pos_y: system.interactivity_mouse_pos_y,
                                    });
                                }
                                else if (system.configParticlesFinal.interactivity.modes.push
                                    .particles_nb > 1) {
                                    pushParticles(system.configParticlesFinal.interactivity.modes.push
                                        .particles_nb);
                                }
                            }
                            break;
                        case "remove":
                            removeParticles(system.configParticlesFinal.interactivity.modes.remove
                                .particles_nb);
                            break;
                        case "bubble":
                            system.bubble_clicking = true;
                            break;
                        case "repulse":
                            system.repulse_clicking = true;
                            system.repulse_count = 0;
                            system.repulse_finish = false;
                            setTimeout(function () {
                                system.repulse_clicking = false;
                            }, system.configParticlesFinal.interactivity.modes.repulse
                                .duration * 1000);
                            break;
                    }
                };
                if (system.configParticlesFinal.interactivity.events.onclick
                    .mode instanceof Array) {
                    system.configParticlesFinal.interactivity.events.onclick.mode.forEach(function (mode) { return cases_1(mode); });
                }
                else {
                    cases_1(system.configParticlesFinal.interactivity.events.onclick.mode);
                }
            }
        });
    }
};

var loadImg = function (type) {
    var _a, _b, _c;
    system.img_error = undefined;
    if (((_a = system.configParticlesFinal.particles.shape.image) === null || _a === void 0 ? void 0 : _a.src) !== "") {
        if (type === "svg") {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.open("GET", (_b = system.configParticlesFinal.particles.shape.image) === null || _b === void 0 ? void 0 : _b.src);
            xhr_1.onreadystatechange = function (data) {
                if (xhr_1.readyState === 4) {
                    if (xhr_1.status === 200) {
                        system.source_svg = data.currentTarget.response;
                        checkBeforeDraw();
                    }
                    else {
                        console.log("Error pJS - Image not found");
                        system.img_error = true;
                    }
                }
            };
            xhr_1.send();
        }
        else {
            var img_1 = new Image();
            img_1.addEventListener("load", function () {
                system.img_obj = img_1;
                checkBeforeDraw();
            });
            img_1.src = (_c = system.configParticlesFinal.particles.shape.image) === null || _c === void 0 ? void 0 : _c.src;
        }
    }
    else {
        console.log("Error pJS - No image.src");
        system.img_error = true;
    }
};

var system = new System();
var systemParticles = function (tag_id, params) {
    var _a, _b, _c;
    var el = document.querySelector("#" + tag_id + " > .particles-js-canvas-el");
    setCanvasPropsEl({
        el: el,
        w: (el === null || el === void 0 ? void 0 : el.offsetWidth) || 0,
        h: (el === null || el === void 0 ? void 0 : el.offsetHeight) || 0,
    });
    system.heightBackground = ((_a = document.getElementById(tag_id)) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
    system.configParticlesFinal = params || configDefaultParticles;
    var obj = {
        size_value: system.configParticlesFinal.particles.size.value,
        size_anim_speed: system.configParticlesFinal.particles.size.anim.speed,
        move_speed: system.configParticlesFinal.particles.move.speed,
        line_linked_distance: system.configParticlesFinal.particles.line_linked.distance,
        line_linked_width: system.configParticlesFinal.particles.line_linked.width,
        mode_grab_distance: system.configParticlesFinal.interactivity.modes.grab.distance,
        mode_bubble_distance: system.configParticlesFinal.interactivity.modes.bubble.distance,
        mode_bubble_size: system.configParticlesFinal.interactivity.modes.bubble.size,
        mode_repulse_distance: system.configParticlesFinal.interactivity.modes.repulse.distance,
    };
    canvasPropsEl.w =
        (((_b = canvasPropsEl.el) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0) * (canvasPropsEl.pxratio || 1);
    canvasPropsEl.h =
        (system.heightBackground || ((_c = canvasPropsEl.el) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0) *
            (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.particles.size.value =
        (obj.size_value || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.particles.size.anim.speed =
        (obj.size_anim_speed || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.particles.move.speed =
        (obj.move_speed || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.particles.line_linked.distance =
        (obj.line_linked_distance || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.interactivity.modes.grab.distance =
        (obj.mode_grab_distance || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.interactivity.modes.bubble.distance =
        (obj.mode_bubble_distance || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.particles.line_linked.width =
        (obj.line_linked_width || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.interactivity.modes.bubble.size =
        (obj.mode_bubble_size || 0) * (canvasPropsEl.pxratio || 1);
    system.configParticlesFinal.interactivity.modes.repulse.distance =
        (obj.mode_repulse_distance || 0) * (canvasPropsEl.pxratio || 1);
    var start = function () {
        var _a;
        if (system.configParticlesFinal.particles.shape.type === "image" ||
            (system.configParticlesFinal.particles.shape.type instanceof Array &&
                isInArray("image", system.configParticlesFinal.particles.shape.type))) {
            system.img_type =
                ((_a = system.configParticlesFinal.particles.shape.image) === null || _a === void 0 ? void 0 : _a.src.substr(system.configParticlesFinal.particles.shape.image.src.length - 3)) || undefined;
            loadImg(system.img_type);
        }
        else {
            checkBeforeDraw();
        }
    };
    /* ---------- start ------------ */
    eventsListeners();
    start();
};

var pJSDom = [];
var load = function (tag_id, config_json, callback) {
    var _a;
    /* pJS elements */
    var pJS_tag = document.getElementById(tag_id);
    var pJS_canvas_class = "particles-js-canvas-el";
    var exist_canvas = pJS_tag === null || pJS_tag === void 0 ? void 0 : pJS_tag.getElementsByClassName(pJS_canvas_class);
    /* remove canvas if exists into the pJS target tag */
    if (exist_canvas === null || exist_canvas === void 0 ? void 0 : exist_canvas.length) {
        while (exist_canvas.length > 0) {
            pJS_tag === null || pJS_tag === void 0 ? void 0 : pJS_tag.removeChild(exist_canvas[0]);
        }
    }
    /* create canvas element */
    var canvas_el = document.createElement("canvas");
    canvas_el.className = pJS_canvas_class;
    canvas_el.style.zIndex = "1";
    canvas_el.style.width = "100%";
    canvas_el.style.position = "absolute";
    /* append canvas */
    var canvas = (_a = document.getElementById(tag_id)) === null || _a === void 0 ? void 0 : _a.prepend(canvas_el);
    /* launch particle.js */
    if (canvas !== null) {
        pJSDom.push(systemParticles(tag_id, config_json));
    }
    if (callback)
        callback();
};
var destroy = function () {
    var _a;
    cancelAnimationFrame(system.drawAnimFrame);
    (_a = canvasPropsEl.el) === null || _a === void 0 ? void 0 : _a.remove();
    pJSDom = [];
};

var Particles = /** @class */ (function (_super) {
    __extends(Particles, _super);
    function Particles(props) {
        var _this = _super.call(this, props) || this;
        _this.setLastRenderedComponent = function (time) {
            _this.setState({ lastRenderedComponent: time });
        };
        _this.componentDidUpdate = function (nextProps) {
            if (nextProps.config !== _this.props.config) {
                try {
                    destroy();
                }
                catch (_a) { }
                load("particles-js", _this.props.config, function () { });
            }
        };
        _this.componentDidMount = function () {
            load("particles-js", _this.props.config, function () { });
        };
        _this.componentWillUnmount = function () {
            destroy();
        };
        _this.state = {
            lastRenderedComponent: new Date().getTime(),
        };
        return _this;
    }
    Particles.prototype.render = function () {
        return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx("div", __assign({ id: "particles-js", style: { width: "100%" } }, { children: this.props.children })) }));
    };
    return Particles;
}(React.Component));

var BackgroundParticles = /** @class */ (function (_super) {
    __extends(BackgroundParticles, _super);
    function BackgroundParticles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackgroundParticles.prototype.render = function () {
        return (jsxRuntime.jsx(React__default["default"].StrictMode, { children: jsxRuntime.jsx(Particles, __assign({ config: this.props.config }, { children: this.props.children })) }));
    };
    return BackgroundParticles;
}(React.Component));

exports.BackgroundParticles = BackgroundParticles;
exports.destroy = destroy;
exports.load = load;
//# sourceMappingURL=index.js.map
