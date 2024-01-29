import Accordian from "./Accordian";

function MobileFooterList() {
  return (
    <>
      <Accordian name="Information">
        <ul>
          <li>About Us</li>
          <li>About Zip</li>
          <li>Privacy Policy</li>
          <li>Search</li>
          <li>Terms</li>
          <li>Orders and Returns</li>
          <li>Contact Us</li>
          <li>Advanced Search</li>
          <li>Newsletter Subscription</li>
        </ul>
      </Accordian>

      <Accordian name="PC Parts">
      <ul>
          <li>CPU</li>
          <li>Add on Cards</li>
          <li>Hard Drives (Internal)</li>
          <li>Graphic Card</li>
          <li>Keyboard / Mice</li>
          <li>Cases / Powersupply / Cooling</li>
          <li>RAM (Memory)</li>
          <li>SoftWare</li>
          <li>Speaker / Headsets</li>
          <li>Motherboards</li>
        </ul>
      </Accordian>
      <Accordian name="Desktop PCs">
      <ul>
          <li>Custom Pcs</li>
          <li>Servers</li>
          <li>MSI All-In-One PCs</li>
          <li> HP/Compaq PCs</li>
          <li> ASUS PCs</li>
          <li>Tecs PCs</li>
        </ul>
      </Accordian>
      <Accordian name="Laptops">
      <ul>
          <li>Evryday Use Notebooks</li>
          <li>MSI Workstation Series</li>
          <li>MSI Prestige Series</li>
          <li>Tablets and Pads</li>
          <li>Netbooks</li>
          <li>Infinity Gaming Notebooks</li>
        </ul>
      </Accordian>
      <Accordian name="Address">
      <ul>
          <li>Address: 1234 Street Adress City Address, 1234</li>
          <li>
            Phones: <span>(00) 1234 5678</span>
          </li>
          <li> We are open: Monday-Thursday: 9:00 AM - 5:30 PM</li>
          <li>Friday: 9:00 AM - 6:00 PM</li>
          <li>Saturday: 11:00 AM - 5:00 PM</li>
          <li>
            E-mail: <span>shop@email.com</span>
          </li>
        </ul>
      </Accordian>
    </>
  );
}

export default MobileFooterList;
