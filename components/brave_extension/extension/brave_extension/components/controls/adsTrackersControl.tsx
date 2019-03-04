/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import {
  BlockedInfoRow,
  BlockedInfoRowData,
  ArrowDownIcon,
  BlockedInfoRowStats,
  BlockedInfoRowText,
  Toggle
} from 'brave-ui/features/shields'

// Group Components
import StaticList from '../list/static'

// Types
import { BlockOptions } from '../../types/other/blockTypes'

// Locale
import { getLocale } from '../../background/api/localeAPI'

// Helpers
import { getTabIndexValueBasedOnProps } from '../../helpers/shieldsUtils'

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
}

interface State {
  trackersBlockedOpen: boolean
}

export default class AdsTrackersControl extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { trackersBlockedOpen: false }
  }

  get totalAdsTrackersBlocked (): number {
    const { adsBlocked, trackersBlocked } = this.props
    return adsBlocked + trackersBlocked
  }

  get totalAdsTrackersBlockedList (): Array<string> {
    const { adsBlockedResources, trackersBlockedResources } = this.props
    return [ ...adsBlockedResources, ...trackersBlockedResources ]
  }

  get shouldBlock3rdPartyTrackersBlocked (): boolean {
    const { ads, trackers } = this.props
    return ads !== 'allow' && trackers !== 'allow'
  }

  get tabIndex (): number {
    const { isBlockedListOpen } = this.props
    return getTabIndexValueBasedOnProps(isBlockedListOpen, this.totalAdsTrackersBlocked)
  }

  onOpen3rdPartyTrackersBlocked = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget) {
      event.currentTarget.blur()
    }
    this.props.setBlockedListOpen()
    this.setState({ trackersBlockedOpen: !this.state.trackersBlockedOpen })
  }

  onOpen3rdPartyTrackersBlockedViaKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event) {
      if (event.key === ' ') {
        event.currentTarget.blur()
        this.props.setBlockedListOpen()
        this.setState({ trackersBlockedOpen: !this.state.trackersBlockedOpen })
      }
    }
  }

  onChange3rdPartyTrackersBlockedEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return
    }
    const shoudEnableAdsTracks = event.target.checked ? 'allow' : 'block'
    this.props.blockAdsTrackers(shoudEnableAdsTracks)
  }

  render () {
    const { favicon, hostname, isBlockedListOpen } = this.props
    const { trackersBlockedOpen } = this.state
    return (
      <>
        <BlockedInfoRow>
          <BlockedInfoRowData
            disabled={this.totalAdsTrackersBlocked === 0}
            tabIndex={this.tabIndex}
            onClick={this.onOpen3rdPartyTrackersBlocked}
            onKeyDown={this.onOpen3rdPartyTrackersBlockedViaKeyboard}
          >
            <ArrowDownIcon />
            <BlockedInfoRowStats>{this.totalAdsTrackersBlocked > 99 ? '99+' : this.totalAdsTrackersBlocked}</BlockedInfoRowStats>
            <BlockedInfoRowText>{getLocale('thirdPartyTrackersBlocked')}</BlockedInfoRowText>
          </BlockedInfoRowData>
          <Toggle
            size='small'
            disabled={isBlockedListOpen}
            checked={this.shouldBlock3rdPartyTrackersBlocked}
            onChange={this.onChange3rdPartyTrackersBlockedEnabled}
          />
        </BlockedInfoRow>
        {
          trackersBlockedOpen &&
            <StaticList
              favicon={favicon}
              hostname={hostname}
              stats={this.totalAdsTrackersBlocked}
              name={getLocale('thirdPartyTrackersBlocked')}
              list={this.totalAdsTrackersBlockedList}
              onClose={this.onOpen3rdPartyTrackersBlocked}
            />
        }
      </>
    )
  }
}
