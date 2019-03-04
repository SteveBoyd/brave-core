/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Types
import { BlockOptions } from '../types/other/blockTypes'

// Group Components
import AdsTrackersControl from './controls/adsTrackersControl'
import HTTPSUpgradesControl from './controls/httpsUpgradesControl'

interface Props {
  // General
  isBlockedListOpen: boolean
  setBlockedListOpen: () => void
  hostname: string
  favicon: string
  // Ads/Trackers
  ads: BlockOptions
  adsBlocked: number
  adsBlockedResources: Array<string>
  trackers: BlockOptions
  trackersBlocked: number
  trackersBlockedResources: Array<string>
  blockAdsTrackers: any
  // HTTPSE redirects
  httpsRedirected: number
  httpUpgradableResources: BlockOptions
  httpsRedirectedResources: Array<string>
  httpsEverywhereToggled: any
}

export default class InterfaceControls extends React.PureComponent<Props, {}> {
  get commonProps () {
    const { favicon, hostname, isBlockedListOpen, setBlockedListOpen } = this.props
    return { favicon, hostname, isBlockedListOpen, setBlockedListOpen }
  }

  get adsTrackersProps () {
    const { ads, adsBlocked, adsBlockedResources, trackers, trackersBlocked, trackersBlockedResources, blockAdsTrackers } = this.props
    return { ads, adsBlocked, adsBlockedResources, trackers, trackersBlocked, trackersBlockedResources, blockAdsTrackers }
  }

  get httpsUpgradesProps () {
    const { httpsRedirected, httpUpgradableResources, httpsRedirectedResources, httpsEverywhereToggled } = this.props
    return { httpsRedirected, httpUpgradableResources, httpsRedirectedResources, httpsEverywhereToggled }
  }

  render () {
    return (
      <>
        <AdsTrackersControl {...this.commonProps} {...this.adsTrackersProps} />
        <HTTPSUpgradesControl {...this.commonProps} {...this.httpsUpgradesProps} />
      </>
    )
  }
}
