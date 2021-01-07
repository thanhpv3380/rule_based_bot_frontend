import styled from 'styled-components';

export default styled.div`
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  .container-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .container-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  }
  .container-title > * {
    margin: 5px;
  }
  .title {
    font-weight: bold;
    font-size: 20px;
  }
  .container-add-item {
    margin: 10px 0;
  }
`;
