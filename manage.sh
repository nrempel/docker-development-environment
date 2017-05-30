#!/bin/bash

set -e

SCRIPT_HOME="$( cd "$( dirname "$0" )" && pwd )"
cd $SCRIPT_HOME

case "$1" in
  start)
      docker-compose up web worker clock
    ;;
  stop)
      docker-compose stop
    ;;
  build)
      docker-compose build
    ;;
  rebuild)
      docker-compose build --no-cache
    ;;
  run)
      if [ "$#" -lt  "2" ]
       then
        echo $"Usage: $0 $1 <command>"
        RETVAL=1
      else
        shift
        docker-compose run shell "$@"
      fi
    ;;
  shell)
      docker-compose run shell
    ;;
  *)
    echo $"Usage: $0 {start|stop|build|rebuild|run}"
    RETVAL=1
esac

cd - > /dev/null
