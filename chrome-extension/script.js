BASE_URL = 'http://localhost:4041';

const fetchSets = async () => {
  const reponse = await fetch(`${BASE_URL}/sets`);

  if (!reponse.ok) {
    console.log((await reponse.json()).error);
  }

  return await reponse.json();
};

const fetchRecentSaves = async (set) => {};

const setRecentSaves = (recentSaves) => {};

const setSelectOptions = (sets) => {};

document.addEventListener('DOMContentLoaded', async () => {
  const sets = await fetchSets();
  const recentSaves = await fetchRecentSaves(sets[0].set_id);

  setSelectOptions(sets);
  setRecentSaves(recentSaves);

  const selectSet = document.getElementById('select-set');
  selectSet.addEventListener('change', async (e) => {
    const setId = sets.find((set) => set.name === e.target.value).set_id;
    chrome.runtime.sendMessage({ type: 'get-set-id', setId });

    recentSaves = await fetchRecentSaves(setId);
    setRecentSaves(recentSaves);
  });
});
