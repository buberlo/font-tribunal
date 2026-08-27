(function () {
  'use strict';

  const doc = document;
  const qs = (selector, context = doc) => context.querySelector(selector);
  const qsa = (selector, context = doc) => Array.from(context.querySelectorAll(selector));

  function targetId(button) {
    return button.getAttribute('data-tab-target') || button.getAttribute('aria-controls');
  }

  function setTab(activeButton) {
    const group = activeButton.closest('[data-tab-group]') || doc;
    const buttons = qsa('[data-tab-button]', group);

    buttons.forEach((button) => {
      const selected = button === activeButton;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', String(selected));

      const id = targetId(button);
      const panel = id ? doc.getElementById(id) : null;
      if (panel) panel.classList.toggle('is-active', selected);
    });

    const id = targetId(activeButton);
    if (id) {
      try {
        history.replaceState(null, '', '#' + id);
      } catch (error) {
        window.location.hash = id;
      }
    }
  }

  function initTabs() {
    const buttons = qsa('[data-tab-button]');
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => setTab(button));
    });

    const hash = window.location.hash.replace('#', '');
    const initial = hash ? buttons.find((button) => targetId(button) === hash) : null;
    setTab(initial || buttons[0]);
  }

  function setFinding(button, open) {
    const id = button.getAttribute('data-collapse-target') || button.getAttribute('aria-controls');
    const panel = id ? doc.getElementById(id) : null;
    if (!panel) return;

    const expanded = open === undefined ? !panel.classList.contains('is-open') : Boolean(open);
    panel.classList.toggle('is-open', expanded);
    button.classList.toggle('is-open', expanded);
    button.setAttribute('aria-expanded', String(expanded));
  }

  function initCollapsibles() {
    const buttons = qsa('[data-collapse-toggle]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => setFinding(button));
    });

    const expandAll = qs('[data-collapse-all="true"]');
    const collapseAll = qs('[data-collapse-all="false"]');

    if (expandAll) {
      expandAll.addEventListener('click', () => {
        buttons.forEach((button) => setFinding(button, true));
      });
    }

    if (collapseAll) {
      collapseAll.addEventListener('click', () => {
        buttons.forEach((button) => setFinding(button, false));
      });
    }
  }

  function initFilters() {
    const select = qs('[data-filter-severity]');
    const findings = qsa('[data-finding]');
    if (!select || !findings.length) return;

    select.addEventListener('change',