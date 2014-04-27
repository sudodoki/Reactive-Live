/** @jsx React.DOM */
var React = require('react');
var App = require('./src/main-app');
React.renderComponent( < App width={100} height={20} /> , document.getElementById('wrapper'));
