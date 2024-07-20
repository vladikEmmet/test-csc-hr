import React, {FC} from 'react';
import styles from './ContextMenu.module.scss';
import {IProduct} from "../../../types/product.type";
import {IItem} from "../../../types/item.type"; // Добавьте стили по своему усмотрению

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, onClose, onEdit, onDelete }) => {
    return (
        <div className={styles.contextMenu} style={{ top: y, left: x }}>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ContextMenu;
