const _ = require('underscore');
const axios = require('axios');

const debounceSearch = _.debounce(async (term, baseUrl, submit) => {
  const response = await axios.get(baseUrl, {
    params: { submit, term },
    headers: { Accept: 'application/json' },
  });
  printSearchResult(response.data);
}, 500);

const printSearchResult = (result) => {
  const resultDiv = document.querySelector('.search_result');
  if (result.length > 0) {
    resultDiv.innerHTML = `
      <div class="table-responsive mt-5">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th class="text-center">Articles</th>
            </tr>
          </thead>
          <tbody>
            ${result
              .map((video) => `<tr><td>${video.title}</td></tr>`)
              .join(' ')}
          </tbody>
        </table>
      </div>`;
  } else {
    resultDiv.innerHTML = `
      <div class="alert alert-info mt-5">Sorry! We couldn't find any result for your search.</div>`;
  }
};

document.addEventListener('turbolinks:load', () => {
  const form = document.querySelector('.search_form');
  const field = document.querySelector('#term');
  if (!form) return;
  const baseUrl = form.getAttribute('action');

  const search = (term, submit = false) => {
    debounceSearch(term, baseUrl, submit);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    search(field.value, true);
  });

  let lastValue = '';

  field.addEventListener('focus', (e) => {
    lastValue = field.value;
  });

  field.addEventListener('keyup', (e) => {
    if (field.value.length > 0 && field.value !== lastValue) {
      lastValue = field.value;
      search(field.value);
    }
  });
});
