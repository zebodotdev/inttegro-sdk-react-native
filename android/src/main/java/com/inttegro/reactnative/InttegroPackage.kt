package com.inttegro.reactnative

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class InttegroPackage : BaseReactPackage() {
    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext,
    ): NativeModule? = if (name == InttegroModule.NAME) {
        InttegroModule(reactContext)
    } else {
        null
    }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            InttegroModule.NAME to ReactModuleInfo(
                InttegroModule.NAME,
                InttegroModule.NAME,
                false,
                false,
                false,
                true,
            ),
        )
    }
}
