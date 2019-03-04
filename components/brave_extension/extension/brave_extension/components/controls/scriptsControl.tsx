/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Types
import { BlockJSOptions } from '../../types/other/blockTypes'

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
import DynamicList from '../list/dynamic'

// Locale
import { getLocale } from '../../background/api/localeAPI'

// Helpers
import { getTabIndexValueBasedOnProps } from '../../helpers/shieldsUtils'

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
  noScriptInfo: any
  changeNoScriptSettings: any
  blockJavaScript: any
  changeAllNoScriptSettings: any
  allowScriptOriginsOnce: any
}

interface State {
  scriptsBlockedOpen: boolean
  scriptsBlockedEnabled: boolean
}

export default class ScriptsControls extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      scriptsBlockedOpen: false,
      scriptsBlockedEnabled: true
    }
  }

  get tabIndex () {
    const { isBlockedListOpen, javascriptBlocked } = this.props
    return getTabIndexValueBasedOnProps(isBlockedListOpen, javascriptBlocked)
  }

  onOpenScriptsBlockedOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget) {
      event.currentTarget.blur()
    }
    this.props.setBlockedListOpen()
    this.setState({ scriptsBlockedOpen: !this.state.scriptsBlockedOpen })
  }

  onOpenScriptsBlockedOpenViaKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event) {
      if (event.key === ' ') {
        event.currentTarget.blur()
        this.props.setBlockedListOpen()
        this.setState({ scriptsBlockedOpen: !this.state.scriptsBlockedOpen })
      }
    }
  }

  onChangeScriptsBlockedEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ scriptsBlockedEnabled: event.target.checked })
  }

  render () {
    const { favicon, hostname, isBlockedListOpen, javascriptBlocked, javascriptBlockedResources } = this.props
    const { scriptsBlockedEnabled, scriptsBlockedOpen } = this.state
    return (
      <>
        <BlockedInfoRow>
          <BlockedInfoRowData
            disabled={javascriptBlocked === 0}
            tabIndex={this.tabIndex}
            onClick={this.onOpenScriptsBlockedOpen}
            onKeyDown={this.onOpenScriptsBlockedOpenViaKeyboard}
          >
            <ArrowDownIcon />
            <BlockedInfoRowStats>{javascriptBlocked > 99 ? '99+' : javascriptBlocked}</BlockedInfoRowStats>
            <BlockedInfoRowText>{getLocale('scriptsBlocked')}</BlockedInfoRowText>
          </BlockedInfoRowData>
          <Toggle
            size='small'
            disabled={isBlockedListOpen}
            checked={scriptsBlockedEnabled}
            onChange={this.onChangeScriptsBlockedEnabled}
          />
        </BlockedInfoRow>
        {
          scriptsBlockedOpen &&
            <DynamicList
              favicon={favicon}
              hostname={hostname}
              name={getLocale('scriptsOnThisSite')}
              list={javascriptBlockedResources}
              onClose={this.onOpenScriptsBlockedOpen}
            />
        }
      </>
    )
  }
}
