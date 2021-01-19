(ns lambdas
  (:require
    [lambdas-helper :refer [handleLambda]]
    [hello.hello :as hello]
    [calc.http-handler :as calc]))

;; Lambda calc1

(gen-class
  :name calc.Handler1
  :prefix calc1
  :implements [com.amazonaws.services.lambda.runtime.RequestStreamHandler]
  :methods
  [[calc1handleRequest [java.io.InputStream java.io.OutputStream com.amazonaws.services.lambda.runtime.Context] void]])

(defn SimpleHandler1handleRequest [_ in out ctx]
  (handleLambda in out ctx calc/handler))

;; Lambda calc2

(gen-class
  :name calc.Handler2
  :prefix calc2
  :implements [com.amazonaws.services.lambda.runtime.RequestStreamHandler]
  :methods
  [[calc2handleRequest [java.io.InputStream java.io.OutputStream com.amazonaws.services.lambda.runtime.Context] void]])

(defn SimpleHandler2handleRequest [_ in out ctx]
  (handleLambda in out ctx calc/handler))

;; Lambda hello

(gen-class
  :name hello.Handler
  :prefix hello
  :implements [com.amazonaws.services.lambda.runtime.RequestStreamHandler]
  :methods
  [[hellohandleRequest [java.io.InputStream java.io.OutputStream com.amazonaws.services.lambda.runtime.Context] void]])

(defn HellohandleRequest [_ in out ctx]
  (handleLambda in out ctx hello/handler))
