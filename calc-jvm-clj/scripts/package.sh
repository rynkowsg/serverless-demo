#!/bin/bash -e

set -x

CURRENT_DIR="$(pwd)"
PROGNAME="$(basename $0)"
SCRIPT_DIR="$(dirname "$0")"
SCRIPT_DIR_ABS="$(cd "$(dirname "$0")"; pwd -P)"
ROOT_DIR=$(cd "${SCRIPT_DIR_ABS}/.."; pwd -P)

# compile AOT
# https://clojure.org/reference/compilation#_gen_class_examples
rm -rf "${ROOT_DIR}/classes"
mkdir -p "${ROOT_DIR}/classes"
(
  cd "${ROOT_DIR}";
  clj -M -e "(compile 'lambdas)"
)

# create uberjar
DEPS=$(cat <<-END
{:paths ["src/main"]
 :aliases
 {:uberjar {:replace-deps {uberdeps/uberdeps {:mvn/version "1.0.4"}}
            :replace-paths []
            :main-opts ["-m" "uberdeps.uberjar" "--deps-file" "../deps.edn"]}}}
END
)

# create uberjar
(
  cd "${SCRIPT_DIR_ABS}"
  clj -Sdeps "$DEPS" -M:uberjar --target ../target/uberjar.jar
)
