(ns calc.http-handler
  (:require
    [clojure.pprint :refer [pprint]]
    [ring.util.response :as response]))

(defn handler
  [request]
  (println request)
  (println "classloader1: " (.getClassLoader clojure.pprint.proxy$java.io.Writer$IDeref$PrettyFlush$4923d848))
  (println "classloader2: " (.getClassLoader clojure.pprint.PrettyFlush))
  (pprint request) ;; fails when running in `sls offline start` (using docker)
  (response/response {:hello "world"}))
