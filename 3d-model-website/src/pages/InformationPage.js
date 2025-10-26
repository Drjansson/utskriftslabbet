// Information page component
function InformationPage() {
  return (
    <div>
      <section className="hero">
        <h1>Our 3D Printing Services</h1>
        <p>Learn about our capabilities, materials, and processes.</p>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <h3>Technologies We Use</h3>
          <ul style={{marginTop: '16px', paddingLeft: '20px'}}>
            <li><strong>FDM (Fused Deposition Modeling)</strong> - For durable, functional prototypes</li>
            <li><strong>SLA (Stereolithography)</strong> - For high-detail miniatures and jewelry</li>
            <li><strong>SLS (Selective Laser Sintering)</strong> - For complex geometries and production parts</li>
            <li><strong>Multi Jet Fusion</strong> - For batch production and functional prototypes</li>
          </ul>
        </div>

        <div className="card">
          <h3>Available Materials</h3>
          <ul style={{marginTop: '16px', paddingLeft: '20px'}}>
            <li><strong>PLA</strong> - Biodegradable, easy to print, great for prototypes</li>
            <li><strong>PETG</strong> - Chemical resistant, food-safe options available</li>
            <li><strong>TPU</strong> - Flexible, rubber-like properties</li>
            <li><strong>PVA</strong> - Water-soluble, ideal for support structures in dual-extrusion prints</li>
          </ul>
        </div>
      </section>

      <section className="card">
        <h2>Our Process</h2>
        <div className="grid grid-3" style={{marginTop: '24px'}}>
          <div>
            <h4>1. File Upload &amp; Review</h4>
            <p>Upload your 3D model files (.STL, .OBJ, .3MF, .STEP, .STP .AMF). Our team reviews for printability and optimizes if needed.</p>
          </div>
          <div>
            <h4>2. Quote &amp; Materials</h4>
            <p>Receive an instant quote and select from our range of materials and finishing options.</p>
          </div>
          <div>
            <h4>3. Production</h4>
            <p>Your model enters our production queue and is printed using the optimal settings for your chosen material.</p>
          </div>
          <div>
            <h4>4. Quality Control</h4>
            <p>Each print undergoes thorough quality inspection to ensure it meets our high standards.</p>
          </div>
          <div>
            <h4>5. Post-Processing</h4>
            <p>Support removal, surface finishing, and any requested post-processing services are completed.</p>
          </div>
          <div>
            <h4>6. Shipping</h4>
            <p>Your finished parts are carefully packaged and shipped via your preferred method.</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Frequently Asked Questions</h2>
        <div className="grid grid-2" style={{marginTop: '24px'}}>
          <div>
            <h4>What file formats do you accept?</h4>
            <p>We accept .STL, .OBJ, .3MF, .STEP, .STP .AMF, and most common 3D file formats. If you have a different format, contact us and we'll work with you.</p>
          </div>
          <div>
            <h4>What's your typical turnaround time?</h4>
            <p>Most orders are completed within 2-5 business days, depending on complexity and quantity. Rush orders available upon request.</p>
          </div>
          <div>
            <h4>Do you offer design services?</h4>
            <p>Yes! Our team can help with 3D modeling, design optimization, and printability analysis for your projects.</p>
          </div>
          <div>
            <h4>What's the maximum print size?</h4>
            <p>Our largest printer can handle objects up to 300mm x 300mm x 400mm. For larger objects, we can print in sections and assemble.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InformationPage;