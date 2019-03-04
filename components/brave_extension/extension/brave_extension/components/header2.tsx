/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import {
  ShieldsHeader,
  MainToggle,
  TotalBlockedStats,
  SiteOverview,
  SiteInfo,
  MainToggleHeading,
  MainToggleText,
  ToggleStateText,
  Favicon,
  SiteInfoText,
  TotalBlockedStatsNumber,
  TotalBlockedStatsText,
  DisabledContentView,
  ShieldIcon,
  DisabledContentText,
  Toggle
} from 'brave-ui/features/shields'

// Types
import { BlockOptions } from '../types/other/blockTypes'

// Locale
import { getLocale } from '../background/api/localeAPI'

// Helpers
import { isHttpOrHttps } from '../helpers/urlUtils'

interface Props {
  enabled: boolean
  favicon: string
  origin: string
  hostname: string
  isBlockedListOpen: boolean
  adsBlocked: number
  trackersBlocked: number
  httpsUpgrades: number
  scriptsBlocked: number
  fingerprintingBlocked: number
  shieldsToggled: any
}

export default class Header extends React.PureComponent<Props, {}> {
  get totalBlocked () {
    const { adsBlocked, trackersBlocked, httpsUpgrades, scriptsBlocked, fingerprintingBlocked } = this.props
    const total = adsBlocked + trackersBlocked + httpsUpgrades + scriptsBlocked + fingerprintingBlocked
    if (!total) {
      return 0
    }
    return total > 99 ? '99+' : total
  }

  get totalBlockedString () {
    const { adsBlocked, trackersBlocked, scriptsBlocked, fingerprintingBlocked, httpsUpgrades } = this.props
    const blockedItems = adsBlocked + trackersBlocked + scriptsBlocked + fingerprintingBlocked

    if (blockedItems === 0 && httpsUpgrades === 0) {
      return `${getLocale('itemsBlocked')} ${getLocale('and')} ${getLocale('connectionsUpgraded')}`
    } else if (blockedItems === 1 && httpsUpgrades === 0) {
      return getLocale('itemBlocked')
    } else if (blockedItems === 0 && httpsUpgrades === 1) {
      return getLocale('connectionUpgradedHTTPSCapital')
    } else if (blockedItems > 1 && httpsUpgrades === 0) {
      return getLocale('itemsBlocked')
    } else if (blockedItems === 0 && httpsUpgrades > 1) {
      return getLocale('connectionsUpgradedHTTPSCapital')
    } else {
      return `${getLocale('itemsBlocked')} ${getLocale('and')} ${getLocale('connectionsUpgraded')}`
    }
  }

  onToggleShields = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isHttpOrHttps(origin)) {
      return
    }
    const shieldsOption: BlockOptions = event.target.checked ? 'allow' : 'block'
    this.props.shieldsToggled(shieldsOption)
  }

  render () {
    const { enabled, favicon, hostname, isBlockedListOpen } = this.props
    return (
      <ShieldsHeader status={enabled ? 'enabled' : 'disabled'}>
        <MainToggle status={enabled ? 'enabled' : 'disabled'}>
          <div>
            <MainToggleHeading>
              {getLocale('shields')}
              <ToggleStateText status={enabled ? 'enabled' : 'disabled'}>
                {enabled ? ` ${getLocale('up')} ` : ` ${getLocale('down')} `}
              </ToggleStateText>
              {getLocale('forThisSite')}
            </MainToggleHeading>
            {enabled ? <MainToggleText>{getLocale('enabledMessage')}</MainToggleText> : null}
          </div>
          <Toggle size='large' checked={enabled} onChange={this.onToggleShields} disabled={isBlockedListOpen} />
        </MainToggle>
        <SiteOverview status={enabled ? 'enabled' : 'disabled'}>
          <SiteInfo>
            <Favicon src={favicon} />
            <SiteInfoText>{hostname}</SiteInfoText>
          </SiteInfo>
          {
            enabled
            ? (
              <TotalBlockedStats>
                <TotalBlockedStatsNumber>{this.totalBlocked}</TotalBlockedStatsNumber>
                <TotalBlockedStatsText>
                  {this.totalBlockedString}
                </TotalBlockedStatsText>
              </TotalBlockedStats>
            )
            : (
              <DisabledContentView>
                <div><ShieldIcon /></div>
                <DisabledContentText>{getLocale('disabledMessage')}</DisabledContentText>
              </DisabledContentView>
            )
          }
        </SiteOverview>
      </ShieldsHeader>
    )
  }
}
