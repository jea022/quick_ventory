import React from 'react';
import PropTypes from 'prop-types';
import '../scss/style.scss';

const ContextMenu = ({ title, onEdit, onClose, onDelete, position }) => {
  return (
    <div className="context-menu" style={{ top: position.mouseY, left: position.mouseX }}>
      <h3 className="context-menu-title">{title}</h3>
      <button className="context-menu-button edit-button" onClick={onEdit}>Editar</button>
      <button className="context-menu-button delete-button" onClick={onDelete}>Eliminar</button>
      <button className="context-menu-button close-button" onClick={onClose}>Cerrar</button>
    </div>
  );
};

ContextMenu.propTypes = {
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  position: PropTypes.shape({
    mouseX: PropTypes.number.isRequired,
    mouseY: PropTypes.number.isRequired,
  }).isRequired,
};

export default ContextMenu;