# EXAMPLE

## Notes

### Serverless

#### Logs

    serverless logs -f hello
    
    # Optionally tail the logs with -t
    serverless logs -f hello -t
    
More: https://www.serverless.com/framework/docs/providers/aws/cli-reference/logs/


## ISSUES

### Issue 1 - when running offline normally (without Docker)

Every time I execute a HTTP request, it always throws an error:
```shell
Local java server not running. For faster local invocations, run "java-invoke-local --server" in your project directory
Exception in thread "main" java.lang.ExceptionInInitializerError
        at clojure.lang.Namespace.<init>(Namespace.java:34)
        at clojure.lang.Namespace.findOrCreate(Namespace.java:176)
        at clojure.lang.Var.internPrivate(Var.java:156)
        at hello.<clinit>(Unknown Source)
        at java.lang.Class.forName0(Native Method)
        at java.lang.Class.forName(Class.java:348)
        at java_lang_Class$forName.call(Unknown Source)
        at org.codehaus.groovy.runtime.callsite.CallSiteArray.defaultCall(CallSiteArray.java:47)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:115)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:143)
        at serverless.jvm.plugin.LambdaFunction.create(LambdaFunction.groovy:19)
        at serverless.jvm.plugin.InvokeRequest.memoizedMethodPriv$loadlongFileString(InvokeRequest.groovy:54)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:498)
        at org.codehaus.groovy.reflection.CachedMethod.invoke(CachedMethod.java:101)
        at groovy.lang.MetaMethod.doMethodInvoke(MetaMethod.java:323)
        at org.codehaus.groovy.runtime.metaclass.ClosureMetaClass.invokeMethod(ClosureMetaClass.java:351)
        at org.codehaus.groovy.runtime.callsite.PogoMetaClassSite.callCurrent(PogoMetaClassSite.java:64)
        at org.codehaus.groovy.runtime.callsite.CallSiteArray.defaultCallCurrent(CallSiteArray.java:51)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.callCurrent(AbstractCallSite.java:156)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.callCurrent(AbstractCallSite.java:184)
        at serverless.jvm.plugin.InvokeRequest$__clinit__closure1.doCall(InvokeRequest.groovy)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:498)
        at org.codehaus.groovy.reflection.CachedMethod.invoke(CachedMethod.java:101)
        at groovy.lang.MetaMethod.doMethodInvoke(MetaMethod.java:323)
        at org.codehaus.groovy.runtime.metaclass.ClosureMetaClass.invokeMethod(ClosureMetaClass.java:263)
        at groovy.lang.MetaClassImpl.invokeMethod(MetaClassImpl.java:1041)
        at groovy.lang.Closure.call(Closure.java:405)
        at org.codehaus.groovy.runtime.memoize.Memoize$MemoizeFunction$1.provide(Memoize.java:139)
        at org.codehaus.groovy.runtime.memoize.ConcurrentCommonCache.getAndPut(ConcurrentCommonCache.java:147)
        at org.codehaus.groovy.runtime.memoize.ConcurrentCommonCache.getAndPut(ConcurrentCommonCache.java:123)
        at org.codehaus.groovy.runtime.memoize.Memoize$MemoizeFunction.call(Memoize.java:136)
        at serverless.jvm.plugin.InvokeRequest.load(InvokeRequest.groovy)
        at serverless.jvm.plugin.InvokeRequest.run(InvokeRequest.groovy:25)
        at serverless.jvm.plugin.InvokeRequest$run.call(Unknown Source)
        at org.codehaus.groovy.runtime.callsite.CallSiteArray.defaultCall(CallSiteArray.java:47)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:115)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:119)
        at serverless.jvm.plugin.MainCli.run(MainCli.groovy:34)
        at picocli.CommandLine.executeUserObject(CommandLine.java:1769)
        at picocli.CommandLine.access$900(CommandLine.java:145)
        at picocli.CommandLine$RunLast.handle(CommandLine.java:2141)
        at picocli.CommandLine$RunLast.handle(CommandLine.java:2108)
        at picocli.CommandLine$AbstractParseResultHandler.execute(CommandLine.java:1975)
        at picocli.CommandLine.execute(CommandLine.java:1904)
        at picocli.CommandLine$execute.call(Unknown Source)
        at org.codehaus.groovy.runtime.callsite.CallSiteArray.defaultCall(CallSiteArray.java:47)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:115)
        at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:127)
        at serverless.jvm.plugin.MainCli.main(MainCli.groovy:43)
Caused by: java.io.FileNotFoundException: Could not locate clojure/core__init.class, clojure/core.clj or clojure/core.cljc on classpath.
        at clojure.lang.RT.load(RT.java:462)
        at clojure.lang.RT.load(RT.java:424)
        at clojure.lang.RT.<clinit>(RT.java:338)
        ... 55 more
```

## Issue 2 - when running offline with --useDocker

The handler code lauches, but when I use pprint, it crashes:
```shell
java.lang.ClassCastException: clojure.pprint.proxy$java.io.Writer$IDeref$PrettyFlush$4923d848 cannot be cast to clojure.pprint.PrettyFlush                                                                                                                              [1/2202]
        at clojure.pprint$pretty_writer$fn__8611.invoke(pretty_writer.clj:392)
        at clojure.pprint.proxy$java.io.Writer$IDeref$PrettyFlush$4923d848.flush(Unknown Source)
        at clojure.core$flush.invokeStatic(core.clj:3711)
        at clojure.core$flush.invoke(core.clj:3705)
        at clojure.core$prn.invokeStatic(core.clj:3722)
        at clojure.core$prn.doInvoke(core.clj:3714)
        at clojure.lang.RestFn.invoke(RestFn.java:397)

        at clojure.pprint$pprint.invokeStatic(pprint_base.clj:252)
        at clojure.pprint$pprint.invoke(pprint_base.clj:241)
        at clojure.pprint$pprint.invokeStatic(pprint_base.clj:245)
        at clojure.pprint$pprint.invoke(pprint_base.clj:241)
        at calc.http_handler$handler.invokeStatic(http_handler.clj:11)

        at calc.http_handler$handler.invoke(http_handler.clj:6)
        at calc.lambdas_helper$handleLambda.invokeStatic(lambdas_helper.clj:24)
        at calc.lambdas_helper$handleLambda.invoke(lambdas_helper.clj:20)
        at calc.lambdas$SimpleHandler2_handleRequest.invokeStatic(lambdas.clj:24)
        at calc.lambdas$SimpleHandler2_handleRequest.invoke(lambdas.clj:22)

        at calc.SimpleHandler2.handleRequest(Unknown Source)

        at lambdainternal.EventHandlerLoader$2.call(EventHandlerLoader.java:902)
        at lambdainternal.AWSLambda.startRuntime(AWSLambda.java:341)
        at lambdainternal.AWSLambda.<clinit>(AWSLambda.java:63)
        at java.lang.Class.forName0(Native Method)

        at java.lang.Class.forName(Class.java:348)

        at lambdainternal.LambdaRTEntry.main(LambdaRTEntry.java:150)
```

In the handler code added logs showing classloader of the symbols from the stack:
```clojure
(println "classloader1: " (.getClassLoader clojure.pprint.proxy$java.io.Writer$IDeref$PrettyFlush$4923d848))
(println "classloader2: " (.getClassLoader clojure.pprint.PrettyFlush))
```
These are two different class loaders.
```
classloader1:  #object[java.net.URLClassLoader 0xbebdb06 java.net.URLClassLoader@bebdb06]
classloader2:  #object[clojure.lang.DynamicClassLoader 0x55746340 clojure.lang.DynamicClassLoader@55746340]
```

## TODO

- [ ] Fix serverless-offline to run uberjar (w/ and w/o Docker)
    - (severless-offline) [JavaRunner.js](https://github.com/dherault/serverless-offline/blob/1454da7dcff5f48da9f19135cb18590b22e29cc2/src/lambda/handler-runner/java-runner/JavaRunner.js)
    - (serverless-toolkit) [java-invoke-local](https://github.com/bytekast/serverless-toolkit/blob/master/libs/java-invoke-local/lib/index.js)
