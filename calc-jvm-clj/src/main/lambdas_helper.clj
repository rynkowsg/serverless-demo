(ns lambdas-helper
  (:require
    [muuntaja.core :as muuntaja]))

;; PRE- & POST- AWS Lambda specific middleware

(defn read-input-stream
  [input-stream]
  (muuntaja/decode "application/json" input-stream))

(defn write-output-stream
  [output-stream response]
  (let [options (assoc muuntaja/default-options :return :bytes)
        encoder (muuntaja/create options)
        output-bytes (muuntaja/encode encoder "application/json" response)]
    (.write output-stream output-bytes)))

(defn handleLambda [in out ctx handler]
  (try
    (->> in
         (read-input-stream)
         (handler)
         (write-output-stream out))
    (catch Exception e
      (.printStackTrace e)
      (write-output-stream out {:statusCode 500}))))

;; Docs

;; https://docs.aws.amazon.com/lambda/latest/dg/java-handler.html#java-handler-interfaces
;; https://github.com/aws/aws-lambda-java-libs/blob/master/aws-lambda-java-core/src/main/java/com/amazonaws/services/lambda/runtime/RequestStreamHandler.java
