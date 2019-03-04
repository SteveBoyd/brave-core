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

// Types
import { BlockOptions } from '../../types/other/blockTypes'

// Group Components
import StaticList from '../list/static'

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
  // HTTPSE redirects
  httpsRedirected: number
  httpUpgradableResources: BlockOptions
  httpsRedirectedResources: Array<string>
  httpsEverywhereToggled: any
}

interface State {
  connectionsUpgradedOpen: boolean
}

export default class HTTPSUpgradesControl extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { connectionsUpgradedOpen: false }
  }

  get tabIndex () {
    const { isBlockedListOpen, httpsRedirected } = this.props
    return getTabIndexValueBasedOnProps(isBlockedListOpen, httpsRedirected)
  }

  onOpenConnectionsUpgradedToHTTPS = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget) {
      event.currentTarget.blur()
    }
    this.props.setBlockedListOpen()
    this.setState({ connectionsUpgradedOpen: !this.state.connectionsUpgradedOpen })
  }

  onOpenConnectionsUpgradedToHTTPSViaKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event) {
      if (event.key === ' ') {
        event.currentTarget.blur()
        this.props.setBlockedListOpen()
        this.setState({ connectionsUpgradedOpen: !this.state.connectionsUpgradedOpen })
      }
    }
  }

  onChangeConnectionsUpgradedToHTTPSEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return
    }
    const shouldEnableHttpsEverywhere = event.target.checked ? 'allow' : 'block'
    this.props.httpsEverywhereToggled(shouldEnableHttpsEverywhere)
  }

  render () {
    const { isBlockedListOpen, favicon, hostname, httpsRedirected, httpsRedirectedResources, httpUpgradableResources } = this.props
    const { connectionsUpgradedOpen } = this.state
    return (
      <>
        <BlockedInfoRow>
          <BlockedInfoRowData
            disabled={httpsRedirected === 0}
            tabIndex={this.tabIndex}
            onClick={this.onOpenConnectionsUpgradedToHTTPS}
            onKeyDown={this.onOpenConnectionsUpgradedToHTTPSViaKeyboard}
          >
            <ArrowDownIcon />
            <BlockedInfoRowStats>{httpsRedirected > 99 ? '99+' : httpsRedirected}</BlockedInfoRowStats>
            <BlockedInfoRowText>{getLocale('connectionsUpgradedHTTPSCapital')}</BlockedInfoRowText>
          </BlockedInfoRowData>
          <Toggle
            size='small'
            disabled={isBlockedListOpen}
            checked={httpUpgradableResources !== 'allow'}
            onChange={this.onChangeConnectionsUpgradedToHTTPSEnabled}
          />
        </BlockedInfoRow>   
        {
          connectionsUpgradedOpen &&
            <StaticList
              favicon={favicon}
              hostname={hostname}
              stats={httpsRedirected}
              name={getLocale('connectionsUpgradedHTTPSCapital')}
              list={httpsRedirectedResources}
              onClose={this.onOpenConnectionsUpgradedToHTTPS}
            />
        }
      </>
    )
  }
}
