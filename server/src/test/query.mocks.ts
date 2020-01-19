

export const emptyQuery = {};

export const missingQuery1 = {
  categories: "Tools, Business",
  rank: "3"
}

export const missingQuery2 = {
  year: "1991",
  rank: "3"
}

export const missingQuery3 = {
  year: "1993",
  categories: "Tools, Business"
}

export const invalidRankQuery = {
  year: "1993",
  categories: "Tools, Business",
  rank: "8"
}

export const invalidYearQuery = {
  year: "2040",
  categories: "Tools, Business",
  rank: "4"
}

export const validQuery = {
  year: "2001",
  categories: "Tools, Business",
  rank: "4"
}

// There are no apps with minimum rating of 5.
export const nothingShouldReturn = {
  year: "1991",
  categories: "Tools, Business",
  rank: "5"
}

