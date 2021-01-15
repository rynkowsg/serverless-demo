(ns calc
  (:require
    [cljs.nodejs :as nodejs]
;    ["./lib/logger" :refer (logger)] ; for `:target :npm-module` throws "ReferenceError: shadow$provide is not define"
    ["./numbers" :as Numbers]        ; for `:target :npm-module` throws "ReferenceError: shadow$provide is not define"
    ))

; When testing :npm-module:
; - (in this file) comment out importing ./numbers
; - (in this file) use hardcoded init-vals
; - (in calc.js) use `require('../gen/calc')`

(defn ^:export add [arr]
  (let [_ (println "(aquiring init value)")
        init-val (. Numbers getZero)     ; for `:target :eps`
;        init-val 1000                    ; for `:target :npm-module`
        _  (println "init-value: " init-val)]
    (reduce + init-val arr)))

(defn ^:export multiply [arr]
  (let [_ (println "(aquiring init value)")
        init-val (. Numbers getOne)     ; for `:target :eps`
;        init-val 1000                   ; for `:target :npm-module`
        _  (println "init-value: " init-val)]
    (reduce * init-val arr)))
