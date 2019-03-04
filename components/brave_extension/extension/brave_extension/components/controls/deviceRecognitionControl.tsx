/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import {
  BlockedInfoRowForSelect,
  BlockedInfoRowDataForSelect,
  ArrowDownIcon,
  BlockedInfoRowStats,
  SelectBox
} from 'brave-ui/features/shields'

// Types
import { BlockFPOptions } from '../../types/other/blockTypes'

// Group Components
import StaticList from '../list/static'

// Locale
import { getLocale } from '../../background/api/localeAPI'

// Helpers
import { getTabIndexValueBasedOnProps } from '../../helpers/shieldsUtils'

interface Props {
  // Global props
  favicon: string
  hostname: string
  isBlockedListOpen: boolean
  setBlockedListOpen: () => void
  // Device Recognition (Fingerprinting)
  fingerprinting: BlockFPOptions
  fingerprintingBlocked: number
  fingerprintingBlockedResources: Array<string>
  blockFingerprinting: any
}

interface State {
  deviceRecognitionOpen: boolean
}

export default class DeviceRecognitionControl extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      deviceRecognitionOpen: false
    }
  }

  get tabIndex () {
    const { isBlockedListOpen, fingerprintingBlocked } = this.props
    return getTabIndexValueBasedOnProps(isBlockedListOpen, fingerprintingBlocked)
  }

  onChangeBlockDeviceRecognition = (event: React.ChangeEvent<any>) => {
    if (!event.target) {
      return
    }
    this.props.blockFingerprinting(event.target.value)
  }

  onOpenDeviceRecognition = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget) {
      event.currentTarget.blur()
    }
    this.props.setBlockedListOpen()
    this.setState({ deviceRecognitionOpen: !this.state.deviceRecognitionOpen })
  }

  onOpenDeviceRecognitionViaKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event) {
      if (event.key === ' ') {
        event.currentTarget.blur()
        this.props.setBlockedListOpen()
        this.setState({ deviceRecognitionOpen: !this.state.deviceRecognitionOpen })
      }
    }
  }

  render () {
    const { favicon, hostname, isBlockedListOpen, fingerprintingBlocked, fingerprintingBlockedResources, fingerprinting } = this.props
    const { deviceRecognitionOpen } = this.state
    return (
      <>
        <BlockedInfoRowForSelect>
          <BlockedInfoRowDataForSelect
            disabled={fingerprintingBlocked === 0}
            tabIndex={this.tabIndex}
            onClick={this.onOpenDeviceRecognition}
            onKeyDown={this.onOpenDeviceRecognitionViaKeyboard}
          >
            <ArrowDownIcon />
            <BlockedInfoRowStats>{fingerprintingBlocked > 99 ? '99+' : fingerprintingBlocked}</BlockedInfoRowStats>
          </BlockedInfoRowDataForSelect>
          <SelectBox
            id='blockFingerprinting'
            disabled={isBlockedListOpen}
            value={fingerprinting}
            onChange={this.onChangeBlockDeviceRecognition}
          >
            <option value='block_third_party'>{getLocale('thirdPartyFingerprintingBlocked')}</option>
            <option value='block'>{getLocale('allFingerprintingBlocked')}</option>
            <option value='allow'>{getLocale('allFingerprintingAllowed')}</option>
          </SelectBox>
        </BlockedInfoRowForSelect>
        {
          deviceRecognitionOpen &&
            <StaticList
              favicon={favicon}
              hostname={hostname}
              stats={fingerprintingBlocked}
              name={getLocale('deviceRecognitionAttempts')}
              list={fingerprintingBlockedResources}
              onClose={this.onOpenDeviceRecognition}
            />
        }
      </>
    )
  }
}
