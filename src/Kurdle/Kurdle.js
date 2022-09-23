import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LetterSlot from './LetterSlot';

function Kurdle() {
	return (
		<Container>
			<Row>
				<Col>
					<LetterSlot LetterSlot="1">CLICK ME</LetterSlot>
				</Col>
			</Row>
		</Container>
	);
}

export default Kurdle;
