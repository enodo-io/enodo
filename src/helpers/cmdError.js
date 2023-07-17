function cmdError(e, msg = null) {
  console.error('Error !');
  if (msg) {
    console.log(msg);
  } else if (e.response?.data?.errors) {
    console.error(`${e.response.data.errors[0].title}: ${e.response.data.errors[0].detail}`);
  } else {
    console.error(`${e.name}: ${e.message}`);
  }
  process.exit(1);
}

export default cmdError;
