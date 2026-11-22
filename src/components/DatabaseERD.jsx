import React, { useState } from 'react';
import { Database, Key, Link2, Copy, Check, FileCode, Layers } from 'lucide-react';
import { DATABASE_TABLES, RELATIONSHIPS, SQL_SCHEMA_SCRIPT } from '../data/databaseSchema';

export default function DatabaseERD({ language }) {
  const isKhmer = language === 'km';
  const [activeView, setActiveView] = useState('visual'); // 'visual' | 'tables' | 'sql'
  const [copied, setCopied] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="erd-page">
      {/* Header Banner */}
      <div className="store-hero-banner mb-4">
        <div className="hero-content">
          <div className="hero-badge">
            <Database size={15} />
            <span>{isKhmer ? 'រចនាសម្ព័ន្ធទិន្នន័យ E-Commerce' : 'Database Schema Design'}</span>
          </div>
          <h1>{isKhmer ? 'គំនូសតាងទំនាក់ទំនងទិន្នន័យ (Database ERD)' : 'Entity Relationship Diagram & Schema'}</h1>
          <p className="hero-desc">
            {isKhmer 
              ? 'រចនាសម្ព័ន្ធទំនាក់ទំនងរវាង Tables ទាំង ៥៖ Customers, Categories, Products, Orders, និង Order_Items'
              : 'Relational data architecture connecting Customers, Categories, Products, Orders, and Order_Items.'}
          </p>

          {/* View Switcher */}
          <div className="erd-view-switcher">
            <button 
              className={`view-tab ${activeView === 'visual' ? 'active' : ''}`}
              onClick={() => setActiveView('visual')}
            >
              <Layers size={16} />
              <span>{isKhmer ? 'គំនូសតាងរូបភាព (Visual ERD)' : 'Visual ERD Diagram'}</span>
            </button>
            <button 
              className={`view-tab ${activeView === 'tables' ? 'active' : ''}`}
              onClick={() => setActiveView('tables')}
            >
              <Database size={16} />
              <span>{isKhmer ? 'តារាង Schemas' : 'Schema Tables (5)'}</span>
            </button>
            <button 
              className={`view-tab ${activeView === 'sql' ? 'active' : ''}`}
              onClick={() => setActiveView('sql')}
            >
              <FileCode size={16} />
              <span>{isKhmer ? 'កូដ SQL Script' : 'SQL DDL Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. VISUAL ERD DIAGRAM */}
      {activeView === 'visual' && (
        <div className="erd-visual-container">
          <div className="erd-canvas-card">
            <div className="erd-canvas-header">
              <h3>{isKhmer ? 'គំនូសតាងទំនាក់ទំនងរវាង Tables' : 'Entity Relationship Diagram'}</h3>
              <div className="legend-row">
                <span className="legend-item"><Key size={14} className="text-warning" /> Primary Key (PK)</span>
                <span className="legend-item"><Link2 size={14} className="text-primary" /> Foreign Key (FK)</span>
                <span className="legend-item"><span className="cardinality-badge">1 : N</span> One-to-Many</span>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="erd-visual-grid">
              {/* Row 1: Categories and Customers */}
              <div className="erd-row">
                {/* Categories Table */}
                <div className="erd-table-box table-categories">
                  <div className="erd-table-header cat-header">
                    <span className="tbl-name">Categories</span>
                    <span className="tbl-pk-badge">PK: category_id</span>
                  </div>
                  <ul className="erd-columns-list">
                    <li className="col-pk"><Key size={12} /> <strong>category_id</strong> <span className="col-type">INT (PK)</span></li>
                    <li>category_name <span className="col-type">VARCHAR(50)</span></li>
                    <li>description <span className="col-type">TEXT</span></li>
                    <li>created_at <span className="col-type">TIMESTAMP</span></li>
                  </ul>
                </div>

                <div className="erd-connector-horizontal">
                  <span className="relation-line">─────── 1 : N ───────►</span>
                  <span className="relation-note">Category contains Products</span>
                </div>

                {/* Products Table */}
                <div className="erd-table-box table-products">
                  <div className="erd-table-header prod-header">
                    <span className="tbl-name">Products</span>
                    <span className="tbl-pk-badge">PK: product_id</span>
                  </div>
                  <ul className="erd-columns-list">
                    <li className="col-pk"><Key size={12} /> <strong>product_id</strong> <span className="col-type">INT (PK)</span></li>
                    <li className="col-fk"><Link2 size={12} /> <strong>category_id</strong> <span className="col-type">INT (FK)</span></li>
                    <li>product_name <span className="col-type">VARCHAR(100)</span></li>
                    <li>price <span className="col-type">DECIMAL(10,2)</span></li>
                    <li>stock_quantity <span className="col-type">INT</span></li>
                    <li>image_url <span className="col-type">VARCHAR(255)</span></li>
                  </ul>
                </div>
              </div>

              {/* Central Bridge */}
              <div className="erd-bridge-row">
                <div className="erd-connector-vertical down-left">
                  <span>▲ Products (1) : Order_Items (N)</span>
                </div>
              </div>

              {/* Row 2: Customers, Orders, and Order_Items */}
              <div className="erd-row">
                {/* Customers Table */}
                <div className="erd-table-box table-customers">
                  <div className="erd-table-header cust-header">
                    <span className="tbl-name">Customers</span>
                    <span className="tbl-pk-badge">PK: customer_id</span>
                  </div>
                  <ul className="erd-columns-list">
                    <li className="col-pk"><Key size={12} /> <strong>customer_id</strong> <span className="col-type">INT (PK)</span></li>
                    <li>first_name <span className="col-type">VARCHAR(50)</span></li>
                    <li>last_name <span className="col-type">VARCHAR(50)</span></li>
                    <li>email <span className="col-type">VARCHAR(100)</span></li>
                    <li>phone_number <span className="col-type">VARCHAR(20)</span></li>
                    <li>address <span className="col-type">TEXT</span></li>
                  </ul>
                </div>

                <div className="erd-connector-horizontal">
                  <span className="relation-line">─────── 1 : N ───────►</span>
                  <span className="relation-note">Customer places Orders</span>
                </div>

                {/* Orders Table */}
                <div className="erd-table-box table-orders">
                  <div className="erd-table-header order-header">
                    <span className="tbl-name">Orders</span>
                    <span className="tbl-pk-badge">PK: order_id</span>
                  </div>
                  <ul className="erd-columns-list">
                    <li className="col-pk"><Key size={12} /> <strong>order_id</strong> <span className="col-type">VARCHAR(20) (PK)</span></li>
                    <li className="col-fk"><Link2 size={12} /> <strong>customer_id</strong> <span className="col-type">INT (FK)</span></li>
                    <li>order_date <span className="col-type">TIMESTAMP</span></li>
                    <li>shipping_method <span className="col-type">VARCHAR(50)</span></li>
                    <li>shipping_cost <span className="col-type">DECIMAL(10,2)</span></li>
                    <li>total_amount <span className="col-type">DECIMAL(10,2)</span></li>
                    <li>order_status <span className="col-type">VARCHAR(20) [Pending]</span></li>
                  </ul>
                </div>

                <div className="erd-connector-horizontal">
                  <span className="relation-line">─────── 1 : N ───────►</span>
                  <span className="relation-note">Order has Items</span>
                </div>

                {/* Order_Items Table */}
                <div className="erd-table-box table-order-items">
                  <div className="erd-table-header item-header">
                    <span className="tbl-name">Order_Items</span>
                    <span className="tbl-pk-badge">PK: order_item_id</span>
                  </div>
                  <ul className="erd-columns-list">
                    <li className="col-pk"><Key size={12} /> <strong>order_item_id</strong> <span className="col-type">INT (PK)</span></li>
                    <li className="col-fk"><Link2 size={12} /> <strong>order_id</strong> <span className="col-type">VARCHAR(20) (FK)</span></li>
                    <li className="col-fk"><Link2 size={12} /> <strong>product_id</strong> <span className="col-type">INT (FK)</span></li>
                    <li>quantity <span className="col-type">INT</span></li>
                    <li>unit_price <span className="col-type">DECIMAL(10,2)</span></li>
                    <li>subtotal <span className="col-type">DECIMAL(10,2)</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Relationship Matrix Summary */}
            <div className="relationships-summary-box">
              <h4>{isKhmer ? 'ការពន្យល់ទំនាក់ទំនង' : 'Relationships Breakdown'}</h4>
              <div className="relation-cards-grid">
                {RELATIONSHIPS.map((rel, idx) => (
                  <div key={idx} className="rel-card">
                    <div className="rel-card-title">
                      <strong>{rel.from}</strong>
                      <span className="arrow-pill">{rel.type}</span>
                      <strong>{rel.to}</strong>
                    </div>
                    <p className="rel-card-desc">{rel.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TABULAR SCHEMA SPECIFICATION */}
      {activeView === 'tables' && (
        <div className="erd-tables-view">
          {DATABASE_TABLES.map((table) => (
            <div key={table.name} className="schema-table-card">
              <div className="schema-table-head">
                <div>
                  <h3>{table.name}</h3>
                  <span className="khmer-tbl-subtitle">{table.khmerName}</span>
                </div>
                <p className="schema-table-desc">{table.description}</p>
              </div>

              <table className="schema-spec-table">
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Key</th>
                    <th>Reference / Constraint</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {table.columns.map((col) => (
                    <tr key={col.name}>
                      <td className="col-name-cell">
                        <code>{col.name}</code>
                      </td>
                      <td className="col-type-cell">{col.type}</td>
                      <td>
                        {col.isPk && (
                          <span className="badge-key pk"><Key size={12} /> PK</span>
                        )}
                        {col.isFk && (
                          <span className="badge-key fk"><Link2 size={12} /> FK</span>
                        )}
                        {!col.isPk && !col.isFk && <span className="text-light">-</span>}
                      </td>
                      <td>
                        {col.ref ? (
                          <span className="ref-badge">{col.ref}</span>
                        ) : (
                          <span className="text-muted">NOT NULL</span>
                        )}
                      </td>
                      <td className="col-note-cell">{col.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* 3. SQL DDL SCRIPT */}
      {activeView === 'sql' && (
        <div className="erd-sql-view">
          <div className="sql-box-card">
            <div className="sql-header">
              <div className="sql-title-info">
                <FileCode size={20} />
                <span>e_commerce_schema.sql (MySQL / PostgreSQL Compatible)</span>
              </div>
              <button className="btn-copy-sql" onClick={handleCopySql}>
                {copied ? (
                  <>
                    <Check size={16} className="text-success" />
                    <span>{isKhmer ? 'បានចម្លង!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>{isKhmer ? 'ចម្លងកូដ SQL' : 'Copy SQL'}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="sql-code-block">
              <code>{SQL_SCHEMA_SCRIPT}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
