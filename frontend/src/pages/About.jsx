import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container py-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="mb-4" style={{ color: '#0d6efd' }}>
            About Roll with It
          </h1>
          <p className="lead text-muted">
            Roll with It is your go-to packing list tool for every kind of trip — whether you're heading to a beach weekend, a business conference, or a hiking adventure.
          </p>
          <hr className="my-4" />
          <p className="text-secondary">
            We know packing can be stressful, so we created a clean, easy-to-use checklist system that helps you stay organized and travel with confidence.
          </p>
          <p className="text-secondary">
            Choose from curated lists for different occasions, or create your own. Wherever you're going, we've got your back — so you can just <strong>roll with it</strong>.
          </p>
          <p className="text-muted mt-4">
            Developed by <a href="https://github.com/tzipporahg" target="_blank">Tzipporah Gordon</a>,  
            <a href="https://github.com/saralowenthal" target="_blank"> Sara (Lowenthal) Miller</a>, and 
            <a href="https://github.com/PessieM" target="_blank"> Pessie Mittelman</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;