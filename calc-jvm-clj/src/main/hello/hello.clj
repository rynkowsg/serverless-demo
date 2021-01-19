(ns hello.hello
  (:require
    [clojure.pprint :refer [pprint]]
    [ring.util.response :as response]))

(defn handler
  [request]
  (println request)
  (response/response {:hello "from cron"}))
