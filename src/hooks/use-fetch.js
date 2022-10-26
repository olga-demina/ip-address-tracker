import { reactive, toRefs } from "vue";

export default function (urlString, options) {
  const state = reactive({
    response: {},
    error: null,
    fetching: false,
  });

  const fetchData = async () => {
    console.log(urlString);
    const url = new URL(urlString);
    for (let key in options) {
      url.searchParams.append(key, options[key]);
    }
    try {
      state.fetching = true;
      const res = await fetch(url, options);
      state.response = await res.json();
      console.log(state.response);
    } catch (errors) {
      state.errors = errors;
    } finally {
      state.fetching = false;
    }
  };

  return { ...toRefs(state), fetchData };
}
