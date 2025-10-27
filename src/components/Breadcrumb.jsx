import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const breadcrumbStyles = {
  padding: '8px 15px',
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
};

const breadcrumbSeparatorStyles = {
  padding: '0 5px',
  color: '#6c757d',
};

const activeBreadcrumbItemStyles = {
  color: '#6c757d',
};

/**
 * Componente Breadcrumb integrado con react-router-dom
 * @param {{ crumbs: Array<{label: string, path: string}> }} props
 */
const Breadcrumb = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol style={breadcrumbStyles}>
        {crumbs.map((crumb, index) => (
          <li key={index} style={breadcrumbItemStyles}>
            {index < crumbs.length - 1 ? (
              <>
                <Link to={crumb.path} style={breadcrumbLinkStyles}>
                  {crumb.label}
                </Link>
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
    })
  ).isRequired,
};

export default Breadcrumb;
