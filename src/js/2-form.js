const formData = {
  email: '',
  message: '',
};

const localStorageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

inspectForm();

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  form.reset();
  formData.email = '';
  formData.message = '';
});

function inspectForm() {
  const savedData = localStorage.getItem(localStorageKey);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      formData.email = parsedData.email?.trim() || '';
      formData.message = parsedData.message?.trim() || '';

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error(error);
    }
  }
}

const inputField = document.querySelector('.feedback-form input[name="email"]');
const placeholderText = 'Type area';

const setPlaceholder = () => {
  inputField.placeholder = placeholderText;
};

const clearPlaceholder = () => {
  inputField.placeholder = '';
};

if (document.activeElement === inputField) {
  setPlaceholder();
}

inputField.addEventListener('focus', setPlaceholder);
inputField.addEventListener('blur', clearPlaceholder);
