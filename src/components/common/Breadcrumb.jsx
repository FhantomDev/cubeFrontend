import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const breadcrumbStyles = {
  padding: '8px 10px',
  marginBottom: '20px',
  listStyle: 'none',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  display: 'flex',
  flexWrap: 'wrap',
};

const breadcrumbItemStyles = {
  display: 'inline-block',
};

const breadcrumbLinkStyles = {
  color: '#0275d8',
  textDecoration: 'none',
  cursor: 'pointer',
};

const breadcrumbSeparatorStyles = {
  padding: '0 5px',
  color: '#6c757d',
};

const activeBreadcrumbItemStyles = {
  color: '#6c757d',
};

const Breadcrumb = ({ crumbs, onDrilldownClick }) => {
  const navigate = useNavigate();

  const handleClick = (crumb) => {
    if (onDrilldownClick && crumb.drilldownLevel !== undefined) {
      onDrilldownClick(crumb.drilldownLevel);
    } else if (crumb.path !== '#') {
      navigate(crumb.path);
    }
  };

  return (
    <nav aria-label="breadcrumb">
      <ol style={breadcrumbStyles}>
        {crumbs.map((crumb, index) => (
          <li key={index} style={breadcrumbItemStyles}>
            {index < crumbs.length - 1 ? (
              <>
                <a onClick={() => handleClick(crumb)} style={breadcrumbLinkStyles}>
                  {crumb.label}
                </a>
                <span style={breadcrumbSeparatorStyles}>/</span>
              </>
            ) : (
              <span style={activeBreadcrumbItemStyles}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      drilldownLevel: PropTypes.number, // Opcional
    })
  ).isRequired,
  onDrilldownClick: PropTypes.func,
};

export default Breadcrumb;
