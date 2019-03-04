/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import { ShieldsPanel } from 'brave-ui/features/shields'

// Components group
import Header from './header2'
import InterfaceControls from './interfaceControls2'
import PrivacyControls from './privacyControls2'
import Footer from './footer2'

// Types
import * as shieldActions from '../types/actions/shieldsPanelActions'
import { Tab } from '../types/state/shieldsPannelState'
import { isShieldsEnabled, getFavicon } from '../helpers/shieldsUtils'

interface Props {
  actions: {
    shieldsToggled: shieldActions.ShieldsToggled
    blockAdsTrackers: shieldActions.BlockAdsTrackers
    httpsEverywhereToggled: shieldActions.HttpsEverywhereToggled
    blockJavaScript: shieldActions.BlockJavaScript
    blockFingerprinting: shieldActions.BlockFingerprinting
    blockCookies: shieldActions.BlockCookies
    allowScriptOriginsOnce: shieldActions.AllowScriptOriginsOnce
    changeNoScriptSettings: shieldActions.ChangeNoScriptSettings
    changeAllNoScriptSettings: shieldActions.ChangeAllNoScriptSettings
  }
  shieldsPanelTabData: Tab
}

interface State {
  isBlockedListOpen: boolean
}

export default class Shields extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { isBlockedListOpen: false }
  }
  setBlockedListOpen = () => {
    this.setState({ isBlockedListOpen: !this.state.isBlockedListOpen })
  }
  render () {
    const { shieldsPanelTabData, actions } = this.props
    if (!shieldsPanelTabData) {
      return null
    }

    const {
      braveShields,
      origin,
      hostname,
      url,
      adsBlocked,
      trackersBlocked,
      httpsRedirected,
      javascriptBlocked,
      fingerprintingBlocked
    } = this.props.shieldsPanelTabData
    const { isBlockedListOpen } = this.state
    const favicon = getFavicon(url)
    const enabled = isShieldsEnabled(braveShields)
    return (
      <ShieldsPanel data-test-id='brave-shields-panel' style={{ width: '370px' }}>
        <Header
          enabled={enabled}
          favicon={favicon}
          origin={origin}
          hostname={hostname}
          isBlockedListOpen={isBlockedListOpen}
          adsBlocked={adsBlocked}
          trackersBlocked={trackersBlocked}
          httpsUpgrades={httpsRedirected}
          scriptsBlocked={javascriptBlocked}
          fingerprintingBlocked={fingerprintingBlocked}
          shieldsToggled={actions.shieldsToggled}
        />
        {
          enabled && (
            <>
              <InterfaceControls
                // Global props
                isBlockedListOpen={isBlockedListOpen}
                setBlockedListOpen={this.setBlockedListOpen}
                hostname={hostname}
                favicon={favicon}
                // Ads/Trackers
                ads={shieldsPanelTabData.ads}
                adsBlocked={shieldsPanelTabData.adsBlocked}
                adsBlockedResources={shieldsPanelTabData.adsBlockedResources}
                trackers={shieldsPanelTabData.trackers}
                trackersBlocked={shieldsPanelTabData.trackersBlocked}
                trackersBlockedResources={shieldsPanelTabData.trackersBlockedResources}
                blockAdsTrackers={actions.blockAdsTrackers}
                // HTTPS Upgrades
                httpsRedirected={shieldsPanelTabData.httpsRedirected}
                httpUpgradableResources={shieldsPanelTabData.httpUpgradableResources}
                httpsRedirectedResources={shieldsPanelTabData.httpsRedirectedResources}
                httpsEverywhereToggled={actions.httpsEverywhereToggled}
              />
              <PrivacyControls
                // Global props
                isBlockedListOpen={isBlockedListOpen}
                setBlockedListOpen={this.setBlockedListOpen}
                hostname={hostname}
                favicon={favicon}
                // JavaScript
                javascript={shieldsPanelTabData.javascript}
                javascriptBlocked={shieldsPanelTabData.javascriptBlocked}
                javascriptBlockedResources={shieldsPanelTabData.javascriptBlockedResources}
                noScriptInfo={shieldsPanelTabData.noScriptInfo}
                changeNoScriptSettings={actions.changeNoScriptSettings}
                blockJavaScript={actions.blockJavaScript}
                changeAllNoScriptSettings={actions.changeAllNoScriptSettings}
                allowScriptOriginsOnce={actions.allowScriptOriginsOnce}
                // Cookies
                blockCookies={actions.blockCookies}
                cookies={shieldsPanelTabData.cookies}
                // Fingerprinting
                fingerprinting={shieldsPanelTabData.fingerprinting}
                fingerprintingBlocked={shieldsPanelTabData.fingerprintingBlocked}
                fingerprintingBlockedResources={shieldsPanelTabData.fingerprintingBlockedResources}
                blockFingerprinting={actions.blockFingerprinting}
              />
            </>
          )
        }
        <Footer isBlockedListOpen={isBlockedListOpen} />
      </ShieldsPanel>
    )
  }
}
