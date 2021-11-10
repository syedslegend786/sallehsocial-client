import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
const MyImojiPicker = ({ setContent, content }) => {
    const onEmojiClick = (event, emojiObject) => {
        setContent(`${content} ${emojiObject.emoji}`);
    };
    return (
        <>
            <Menu menuButton={<MenuButton>😀</MenuButton>} transition>
                <MenuItem>
                    <Picker
                        disableSearchBar={true}
                        preload={true}
                        onEmojiClick={onEmojiClick}
                    />
                </MenuItem>
            </Menu>
        </>
    );
};

export default MyImojiPicker;