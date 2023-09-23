// Copyright 2023 Ryan McGuinness
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Should take a number argument >= 1 and return a number value
export const generateRandomNumber = (upperBound) => {
  throw new Error("Method not implemented.");
}

// Validator functions

export const LastSpaceValidator = (space) => {
  return false;
}

export const FirstSpaceValidator = (space) => {
  return false;
}

export const ALL_VALIDATORS = [LastSpaceValidator, FirstSpaceValidator];