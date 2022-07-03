import React, { useEffect, useState } from 'react'
import { KeyBinding, Resize } from './types'
import { DEFAULT_SETTING, CUSTOM_KEY_BINDING_STORAGE_KEY } from './constants'
import WysiwygSetting from './WysiwygSetting'
import WysiwygWhiteBoard from './WysiwygWhiteBoard'

export interface WysiwygProps {
  resizeType?: Resize
  configurable?: boolean
  keyBindings?: KeyBinding[]
}

const Wysiwyg = ({
  resizeType = 'none',
  configurable = true,
  keyBindings,
}: WysiwygProps) => {
  const [isSettingOpened, setIsSettingOpened] = useState(false)
  const [customKeyBindings, setCustomBindings] = useState<KeyBinding[]>(
    keyBindings ||
      JSON.parse(
        localStorage.getItem(CUSTOM_KEY_BINDING_STORAGE_KEY) ||
          JSON.stringify(DEFAULT_SETTING.KEY_BINDINGS)
      )
  )

  const openSettingModal = () => {
    setIsSettingOpened((value) => !value)
  }

  useEffect(() => {
    localStorage.setItem(
      CUSTOM_KEY_BINDING_STORAGE_KEY,
      JSON.stringify(customKeyBindings)
    )
  }, [customKeyBindings])

  return (
    <>
      {configurable && (
        <button type="button" onClick={openSettingModal}>
          Setting
        </button>
      )}
      {isSettingOpened && (
        <WysiwygSetting
          keyBindings={customKeyBindings}
          onCloseHandler={() => {
            console.log('Closed')
            setIsSettingOpened(false)
          }}
          onKeyBindingChangeHandler={setCustomBindings}
        />
      )}
      <WysiwygWhiteBoard resizeType={resizeType} />
    </>
  )
}

export default Wysiwyg
