/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Types
import { BlockCookiesOptions, BlockJSOptions, BlockFPOptions } from '../types/other/blockTypes'
import { NoScriptInfo } from '../types/other/noScriptInfo'

// Group Components
import ScriptsControl from './controls/scriptsControl'
import CookiesControl from './controls/cookiesControl'
import DeviceRecognitionControl from './controls/deviceRecognitionControl'

interface Props {
  // Global props
  isBlockedListOpen: boolean
  setBlockedListOpen: () => void
  hostname: string
  favicon: string
  // JavaScript
  javascript: BlockJSOptions
  javascriptBlocked: number
  javascriptBlockedResources: Array<string>
  noScriptInfo: NoScriptInfo
  changeNoScriptSettings: any
  blockJavaScript: any
  changeAllNoScriptSettings: any
  allowScriptOriginsOnce: any
  // Cookies
  blockCookies: any
  cookies: BlockCookiesOptions
  // Device Recognition (Fingerprinting)
  fingerprinting: BlockFPOptions
  fingerprintingBlocked: number
  fingerprintingBlockedResources: Array<string>
  blockFingerprinting: any
}

export default class PrivacyControls extends React.PureComponent<Props, {}> {
  render () {
    const {
      favicon,
      hostname,
      setBlockedListOpen,
      isBlockedListOpen,
      javascript,
      javascriptBlocked,
      javascriptBlockedResources,
      noScriptInfo,
      changeNoScriptSettings,
      blockJavaScript,
      changeAllNoScriptSettings,
      allowScriptOriginsOnce,
      blockCookies,
      cookies,
      fingerprintingBlocked,
      fingerprinting,
      fingerprintingBlockedResources,
      blockFingerprinting
    } = this.props
    return (
      <>
        <ScriptsControl
          favicon={favicon}
          hostname={hostname}
          isBlockedListOpen={isBlockedListOpen}
          setBlockedListOpen={setBlockedListOpen}
          javascript={javascript}
          javascriptBlocked={javascriptBlocked}
          javascriptBlockedResources={javascriptBlockedResources}
          noScriptInfo={noScriptInfo}
          changeNoScriptSettings={changeNoScriptSettings}
          blockJavaScript={blockJavaScript}
          changeAllNoScriptSettings={changeAllNoScriptSettings}
          allowScriptOriginsOnce={allowScriptOriginsOnce}
        />
        <CookiesControl
          isBlockedListOpen={isBlockedListOpen}
          blockCookies={blockCookies}
          cookies={cookies}
        />
        <DeviceRecognitionControl
          favicon={favicon}
          hostname={hostname}
          isBlockedListOpen={isBlockedListOpen}
          setBlockedListOpen={setBlockedListOpen}
          fingerprintingBlocked={fingerprintingBlocked}
          fingerprinting={fingerprinting}
          fingerprintingBlockedResources={fingerprintingBlockedResources}
          blockFingerprinting={blockFingerprinting}
        />
      </>
    )
  }
}
