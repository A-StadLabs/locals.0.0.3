contract localsAvatar {

    bytes32[] validations;
    uint validationsCount;
    
    function addValidation(bytes32 validatorhash) {
        validations.push(validatorhash);
        validationsCount++;
    }

    function countValidations() constant returns (uint count) {
        return validationsCount;
    }
    
    function getValidations() constant returns (bytes32[] validations){
        return validations;
    }
}
